export function multiplyString(str:string, num:number) {
  let res = "";

  for (let i = 0; i < num; i++)
    res += str;

  return res;
}