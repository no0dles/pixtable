enum P {
  Left = 1 << 0,
  Middle = 1 << 1,
  Right = 1 << 2
}

export class PixelFont {
  static getText(text: string) {
    let offset = 0;
    const result = [];

    for(var chr of text) {
      console.log(chr);
      const positions = PixelFont.getChar(chr);
      for(var y = 0; y < positions.length; y++) {
        switch (positions[y]) {
          case P.Left:
            result.push(offset);
            result.push(y);
            break;
          case P.Right:
            result.push(offset+1);
            result.push(y);
            break;
          case P.Right:
            result.push(offset+2);
            result.push(y);
            break;
          case P.Left + P.Right:
            result.push(offset);
            result.push(y);
            result.push(offset+2);
            result.push(y);
            break;
          case P.Left + P.Middle + P.Right:
            result.push(offset);
            result.push(y);
            result.push(offset+1);
            result.push(y);
            result.push(offset+2);
            result.push(y);
            break;
        }
      }

      offset += 4;
    }

    return result;
  }

  static getChar(chr: string) {
    switch (chr) {
      case '0':
        return [
          P.Left + P.Middle + P.Right,
          P.Left + P.Right,
          P.Left + P.Right,
          P.Left + P.Right,
          P.Left + P.Middle + P.Right
        ];

      case '1':
        return [
          P.Middle,
          P.Middle,
          P.Middle,
          P.Middle,
          P.Middle
        ];

      case '2':
        return [
          P.Left + P.Middle + P.Right,
          P.Right,
          P.Left + P.Middle + P.Right,
          P.Left,
          P.Left + P.Middle + P.Right
        ];

      case '3':
        return [
          P.Left + P.Middle + P.Right,
          P.Right,
          P.Left + P.Middle + P.Right,
          P.Right,
          P.Left + P.Middle + P.Right
        ];

      case '4':
        return [
          P.Left + P.Right,
          P.Left + P.Right,
          P.Left + P.Middle + P.Right,
          P.Right,
          P.Right,
        ];

      case '5':
        return [
          P.Left + P.Middle + P.Right,
          P.Left,
          P.Left + P.Middle + P.Right,
          P.Right,
          P.Left + P.Middle + P.Right
        ];

      case '6':
        return [
          P.Left + P.Middle + P.Right,
          P.Left,
          P.Left + P.Middle + P.Right,
          P.Left + P.Right,
          P.Left + P.Middle + P.Right
        ];

      case '7':
        return [
          P.Left + P.Middle + P.Right,
          P.Right,
          P.Right,
          P.Right,
          P.Right,
        ];

      case '8':
        return [
          P.Left + P.Middle + P.Right,
          P.Left + P.Right,
          P.Left + P.Middle + P.Right,
          P.Left + P.Right,
          P.Left + P.Middle + P.Right
        ];

      case '9':
        return [
          P.Left + P.Middle + P.Right,
          P.Left + P.Right,
          P.Left + P.Middle + P.Right,
          P.Right,
          P.Left + P.Middle + P.Right
        ];
    }
  }
}
