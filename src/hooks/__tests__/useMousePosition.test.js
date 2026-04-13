import { renderHook, act } from '@testing-library/react';
import useMousePosition from '../useMousePosition';

describe('useMousePosition', () => {
  it('returns initial position { x: 0, y: 0 }', () => {
    const { result } = renderHook(() => useMousePosition());
    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it('updates position when mousemove fires', () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 123, clientY: 456 }));
    });

    expect(result.current).toEqual({ x: 123, y: 456 });
  });

  it('tracks multiple mousemove events', () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 20 }));
    });
    expect(result.current).toEqual({ x: 10, y: 20 });

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 300, clientY: 400 }));
    });
    expect(result.current).toEqual({ x: 300, y: 400 });
  });

  it('removes the mousemove listener on unmount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useMousePosition());
    unmount();

    expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
