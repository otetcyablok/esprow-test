import { useRef, useState, useEffect, type ReactNode, useCallback } from 'react';

interface VirtualScrollerProps<T> {
  items: T[];
  itemHeight?: number;
  overscan?: number;
  className?: string;
  renderItem: (item: T, index: number) => ReactNode;
  getItemKey?: (item: T, index: number) => string | number;
  dynamicHeight?: boolean;
}

function VirtualScroll<T>({
                              items,
                              itemHeight = 24,
                              overscan = 25,
                              className = '',
                              renderItem,
                              getItemKey,
                              dynamicHeight = false,
                            }: VirtualScrollerProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [heights, setHeights] = useState<Map<number, number>>(new Map());
  const observersRef = useRef<Map<number, ResizeObserver>>(new Map());

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [items]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    const handleResize = () => {
      setContainerHeight(container.clientHeight);
    };

    handleResize();

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (dynamicHeight) {
      observersRef.current.forEach(observer => observer.disconnect());
      observersRef.current.clear();

      queueMicrotask(() => {
        setHeights(new Map());
      });
    }
  }, [items, dynamicHeight]);

  useEffect(() => {
    return () => {
      observersRef.current.forEach(observer => observer.disconnect());
      observersRef.current.clear();
    };
  }, []);

  const getItemHeight = useCallback((index: number) => {
    return dynamicHeight
      ? heights.get(index) ?? itemHeight
      : itemHeight;
  }, [dynamicHeight, heights, itemHeight]);

  const getItemOffset = useCallback((index: number) => {
    let offset = 0;

    for (let i = 0; i < index; i++) {
      offset += getItemHeight(i);
    }

    return offset;
  }, [getItemHeight]);

  const getTotalHeight = useCallback(() => {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      total += getItemHeight(i);
    }

    return total;
  }, [items.length, getItemHeight]);

  const getVisibleRange = useCallback(() => {
    if (!dynamicHeight) {
      const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
      const end = Math.min(
        items.length - 1,
        Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
      );

      return { start, end };
    }

    let start = 0;
    let offset = 0;

    for (let i = 0; i < items.length; i++) {
      const height = getItemHeight(i);

      if (offset + height > scrollTop) {
        start = Math.max(0, i - overscan);
        break;
      }

      offset += height;
    }

    let end = start;

    offset = getItemOffset(start);

    for (let i = start; i < items.length; i++) {
      if (offset > scrollTop + containerHeight) {
        end = Math.min(items.length - 1, i + overscan);

        break;
      }

      offset += getItemHeight(i);
      end = i;
    }

    return { start, end };
  }, [dynamicHeight, scrollTop, itemHeight, overscan, items.length, containerHeight, getItemHeight, getItemOffset]);

  const { start: startIndex, end: endIndex } = getVisibleRange();
  const visibleItems = [];

  for (let i = startIndex; i <= endIndex; i++) {
    visibleItems.push({
      index: i,
      item: items[i],
      key: getItemKey ? getItemKey(items[i], i) : i,
      start: dynamicHeight ? getItemOffset(i) : i * itemHeight,
    });
  }

  const measureElement = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (!dynamicHeight) return;

    const existingObserver = observersRef.current.get(index);

    if (existingObserver) {
      existingObserver.disconnect();
      observersRef.current.delete(index);
    }

    if (el) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;

          if (height) {
            setHeights(prev => {
              const current = prev.get(index);

              if (current !== height) {
                const newHeights = new Map(prev);

                newHeights.set(index, height);

                return newHeights;
              }

              return prev;
            });
          }
        }
      });

      observer.observe(el);
      observersRef.current.set(index, observer);

      const height = el.getBoundingClientRect().height;

      if (height) {
        setHeights(prev => {
          const current = prev.get(index);

          if (current !== height) {
            const newHeights = new Map(prev);

            newHeights.set(index, height);

            return newHeights;
          }

          return prev;
        });
      }
    }
  }, [dynamicHeight]);

  return (
    <div ref={containerRef} className={`overflow-auto ${className}`}>
      <div
        className="relative"
        style={{ height: `${getTotalHeight()}px` }}
      >
        {visibleItems.map(({ item, index, key, start }) => (
          <div
            key={key}
            data-index={index}
            ref={measureElement(index)}
            className="absolute top-0 left-0 w-full"
            style={{ transform: `translateY(${start}px)` }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VirtualScroll;
