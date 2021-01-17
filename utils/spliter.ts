const partition = (arr: any[], start: number, end: number, chunks: any[]) => {
  if (start < end) {
    chunks.push({ type: "P", children: arr.slice(start, end) });
  }
  chunks.push({ type: "I", children: [arr[end]] });
};

const spliter = (arr: any[]) => {
  const imgIndexes: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].props?.node?.type === "imageReference") imgIndexes.push(i);
  }

  if (imgIndexes.length === 0) return [{ type: "P", children: arr }];
  let chunks: any[] = [];
  let prevIndex: number;
  for (let i = 0; i < imgIndexes.length; i++) {
    const start = prevIndex ?? 0;
    const end = imgIndexes[i];
    partition(arr, start, end, chunks);
    prevIndex = end + 1;
  }
  if (arr.length > imgIndexes[imgIndexes.length - 1] + 1) {
    arr.splice(0, imgIndexes[imgIndexes.length - 1] + 1);
    chunks.push({ type: "P", children: arr });
  }
  return chunks;
};
export default spliter;
