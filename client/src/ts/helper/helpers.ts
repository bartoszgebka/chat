export class Helpers {
  public static generateRandomColor() {
    const minValue = 100;

    const random = () =>
      Math.floor(Math.random() * (255 - minValue + 1) + minValue);

    return `#${random().toString(16)}${random().toString(
      16,
    )}${random().toString(16)}`;
  }

  public static getUserShortName(username: string) {
    return username
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase())
      .join("");
  }
}
