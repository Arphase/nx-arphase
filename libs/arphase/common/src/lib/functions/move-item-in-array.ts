/**
 * Moves an array item from one position in an array to another.
   Note: This is a pure function so a new array will be returned, instead
   of altering the array argument.
 * @param array Array in which to move an item.
 * @param moveIndex The index of the item to move.
 * @param toIndex  The index to move item at moveIndex to.
 * @returns item in array
 */
export function moveItemInArray<T>(array: T[], moveIndex: number, toIndex: number): T[] {
  const item = array[moveIndex];
  const length = array.length;
  const diff = moveIndex - toIndex;

  if (diff > 0) {
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length),
    ];
  } else if (diff < 0) {
    const targetIndex = toIndex + 1;
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length),
    ];
  }
  return array;
}
