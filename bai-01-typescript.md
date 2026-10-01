# Bài 1 — Kiểu dữ liệu cơ bản trong TypeScript

> Nội dung: `number`, `boolean`, `string`, mảng, tuple, enum, `any`, `unknown`.
> Mục tiêu: khai báo đúng kiểu, hiểu thông báo lỗi và xử lý dữ liệu chưa rõ kiểu một cách an toàn.

## 1. Góp ý cho ghi chú ban đầu

| Nội dung | Điều cần sửa hoặc bổ sung |
| --- | --- |
| Kiểu cơ bản và mảng | Bổ sung cú pháp khai báo, ví dụ hợp lệ và ví dụ gán sai kiểu. |
| Mục đích của tuple | Sửa “thường không được sử dụng để nhóm…” thành “thường được sử dụng để nhóm các giá trị liên quan, có thể khác kiểu”. |
| Độ dài tuple | Tuple thông thường mô tả số lượng và kiểu theo vị trí khi kiểm tra kiểu. Tuple vẫn là mảng JavaScript khi chạy; cần hiểu thêm về khả năng thay đổi và `readonly`. |
| Giá trị `20` trong tuple | Nếu biểu diễn tuổi, đặt tên biến là `age`, không phải `id`. |
| Enum | Bổ sung cách dùng enum làm kiểu của biến và giải thích ánh xạ ngược của numeric enum. |
| Enum hỗn hợp | Có tồn tại, nhưng nên tránh trong bài thực hành đầu tiên để dữ liệu nhất quán. |
| `any` | “Không kiểm tra kiểu” áp dụng cho thao tác trên giá trị `any`, không có nghĩa toàn bộ chương trình mất kiểm tra kiểu. |
| `unknown` | Cần thu hẹp kiểu trước thao tác đặc thù như gọi `toUpperCase()`. Vẫn có thể gán giá trị hoặc truyền vào `console.log()` trực tiếp. |
| Tên trong code | Sửa `getYser` → `getUser`, `Rigt` → `Right`, `NotFount` → `NotFound`, `Unkown` → `unknown`. Thống nhất `"LEFT"` với các chuỗi enum viết hoa còn lại. |

## 2. Khai báo kiểu và suy luận kiểu

Khai báo kiểu dùng dấu `:` sau tên biến. TypeScript cũng có thể suy luận kiểu từ giá trị ban đầu.

```ts
let age: number = 20; // Khai báo kiểu rõ ràng
let score = 8.5;      // TypeScript suy luận là number

age = 21;
score = 9;

// age = "21";   // Lỗi kiểu: string không gán được cho number
// score = "9";  // Suy luận kiểu vẫn giúp phát hiện lỗi
```

Dùng tên kiểu viết thường: `number`, `string`, `boolean`. [Tham khảo: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).

### Phân biệt lúc biên dịch và lúc chạy

- **Lỗi kiểm tra kiểu:** TypeScript phát hiện khi phân tích code, trước khi chạy.
- **Lỗi runtime:** xảy ra khi JavaScript thực thi, ví dụ gọi phương thức không tồn tại.

Chú thích kiểu được xóa khi biên dịch. TypeScript không tự kiểm tra dữ liệu API lúc chạy. `any` hoặc ép kiểu sai có thể khiến chương trình vượt qua kiểm tra kiểu nhưng vẫn lỗi runtime. [Tham khảo: The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html).

## 3. Các kiểu dữ liệu cơ bản

### 3.1. `number`, `string`, `boolean`

| Kiểu | Dùng cho | Ví dụ |
| --- | --- | --- |
| `number` | Số, gồm số nguyên và số thập phân | `20`, `8.5`, `-3` |
| `string` | Chuỗi ký tự | `"Bao"`, `"TypeScript"` |
| `boolean` | Giá trị đúng hoặc sai | `true`, `false` |

```ts
const fullName: string = "Phạm Thiên Bảo";
const age: number = 20;
const averageScore: number = 8.5;
const isStudent: boolean = true;

console.log(`${fullName} — ${age} tuổi`);
console.log(averageScore); // 8.5
console.log(isStudent);   // true

// const price: number = "100";  // Sai kiểu
// const active: boolean = 1;    // Sai kiểu
```

### 3.2. Mảng

`number[]` và `Array<number>` cùng mô tả mảng số. Mảng có thể thêm hoặc bớt phần tử; mỗi phần tử phải phù hợp với kiểu đã khai báo. [Tham khảo: Arrays](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays).

```ts
const scores: number[] = [7, 8, 9];
const names: Array<string> = ["Bảo", "An"];
const results: boolean[] = [true, false, true];

scores.push(10);
names.push("Bình");

console.log(scores);  // [7, 8, 9, 10]
console.log(names);   // ["Bảo", "An", "Bình"]
console.log(results.length); // 3

// scores.push("10"); // Sai: đây là chuỗi
```

`const` ngăn gán lại biến; nó không tự ngăn `push()` hoặc sửa phần tử mảng.

## 4. Tuple

Tuple mô tả kiểu của từng vị trí. Ví dụ `[string, number]` gồm một chuỗi ở vị trí `0` và một số ở vị trí `1`.

```ts
let person: [string, number];
person = ["Phạm Thiên Bảo", 20];

console.log(person[0]); // Phạm Thiên Bảo
console.log(person[1]); // 20

// person = [20, "Bảo"];       // Sai thứ tự kiểu
// person = ["Bảo"];           // Thiếu phần tử
// person = ["Bảo", 20, true]; // Thừa phần tử

function getUser(): [string, number] {
  return ["Bảo", 20];
}

const [userName, age] = getUser();
console.log(userName); // Bảo
console.log(age);      // 20
```

`const [userName, age] = ...` là **destructuring**: lấy phần tử theo thứ tự rồi gán vào từng biến.

### Mảng và tuple khác nhau thế nào?

| Tiêu chí | Mảng `number[]` | Tuple `[string, number]` |
| --- | --- | --- |
| Kiểu phần tử | Mỗi phần tử là số | Vị trí đầu là chuỗi, vị trí sau là số |
| Số phần tử | Không quy định cụ thể | Dạng này quy định 2 phần tử |
| Ý nghĩa vị trí | Thường là các mục cùng loại | Mỗi vị trí có vai trò riêng |
| Ví dụ | Danh sách điểm | Cặp tên và tuổi |

### Lưu ý về thay đổi tuple

```ts
const pair: [string, number] = ["Bảo", 20];
pair.push(21); // Được TypeScript cho phép với tuple có thể thay đổi
console.log(pair.length); // Khi chạy: 3

const fixedPair: readonly [string, number] = ["Bảo", 20];
// fixedPair.push(21); // Lỗi kiểu
// fixedPair[1] = 22; // Lỗi kiểu
```

`readonly` ngăn sửa qua tham chiếu này khi kiểm tra kiểu; không tự đóng băng dữ liệu lúc chạy. Tuple còn có phần tử tùy chọn và rest, có thể học ở bài sau. [Tham khảo: Tuple Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types).

## 5. Enum

Enum đặt tên cho một tập giá trị liên quan, chẳng hạn hướng di chuyển hoặc trạng thái đơn hàng.

### 5.1. Numeric enum

Khi không chỉ định giá trị, phần tử đầu là `0`, các phần tử tiếp theo tăng thêm `1`.

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const currentDirection: Direction = Direction.Right;

console.log(Direction.Up);     // 0
console.log(currentDirection); // 3
console.log(Direction[0]);     // "Up"
```

`Direction[0]` là **ánh xạ ngược**: tra tên thành viên từ giá trị số.

```ts
enum Level {
  Beginner = 1,
  Intermediate, // 2
  Advanced,     // 3
}

console.log(Level.Advanced); // 3
```

### 5.2. String enum

```ts
enum OrderStatus {
  Pending = "PENDING",
  Paid = "PAID",
  Cancelled = "CANCELLED",
}

const status: OrderStatus = OrderStatus.Paid;
console.log(status); // "PAID"
```

String enum không tự tạo ánh xạ ngược từ giá trị sang tên. Với khai báo trên, `OrderStatus["PAID"]` không phải cách tra ngược hợp lệ.

### 5.3. Enum hỗn hợp

```ts
enum ResponseStatus {
  Success = 200,
  NotFound = "NOT_FOUND",
  Error = 500,
}

console.log(ResponseStatus.Success);  // 200
console.log(ResponseStatus.NotFound); // "NOT_FOUND"
```

Enum hỗn hợp chứa cả số và chuỗi. Với bài đầu tiên, nên chọn một loại nhất quán. Enum thông thường tạo ra đối tượng JavaScript khi biên dịch. [Tham khảo: Enums](https://www.typescriptlang.org/docs/handbook/enums.html).

## 6. `any`

`any` chấp nhận mọi kiểu giá trị và bỏ qua nhiều kiểm tra trên giá trị đó.

```ts
let dynamicVar: any;

dynamicVar = "Hello";
console.log(dynamicVar); // Hello

dynamicVar = true;
console.log(dynamicVar); // true

dynamicVar = 123;
console.log(dynamicVar); // 123

// TypeScript cho phép, nhưng nếu chạy sẽ xảy ra TypeError:
// dynamicVar.toUpperCase();
```

Chỉ dùng `any` khi có lý do cụ thể, chẳng hạn chuyển đổi code JavaScript cũ. Nếu đã biết kiểu thì khai báo kiểu đó; nếu chưa biết dữ liệu là gì thì cân nhắc `unknown`. [Tham khảo: any](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any).

## 7. `unknown`

`unknown` nhận được mọi kiểu giá trị, nhưng không cho phép tùy ý thao tác như thể đã biết kiểu.

```ts
function printInput(input: unknown): void {
  if (typeof input === "string") {
    console.log(input.toUpperCase());
  } else if (typeof input === "number") {
    console.log(input * 2);
  } else if (typeof input === "boolean") {
    console.log(input ? "Đúng" : "Sai");
  } else {
    console.log("Chưa hỗ trợ kiểu dữ liệu này");
  }
}

printInput("Hello"); // HELLO
printInput(10);      // 20
printInput(false);   // Sai
printInput(null);    // Chưa hỗ trợ kiểu dữ liệu này
```

`void` ở đây cho biết hàm không trả về giá trị hữu ích. Kiểm tra `typeof` giúp TypeScript **thu hẹp kiểu** trong từng nhánh. [Tham khảo: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

### So sánh `any` và `unknown`

| Tiêu chí | `any` | `unknown` |
| --- | --- | --- |
| Nhận chuỗi, số, boolean… | Có | Có |
| Gọi thẳng `.toUpperCase()` | Được trình kiểm tra kiểu cho phép | Cần xác định là chuỗi trước |
| Gán trực tiếp vào biến `string` | Được cho phép | Cần thu hẹp kiểu hoặc khẳng định kiểu |
| Phù hợp với dữ liệu chưa rõ kiểu | Dễ bỏ sót lỗi | Buộc xử lý kiểu rõ ràng hơn |

Có thể `console.log(input)` ngay cả khi `input` là `unknown`. Không dùng `as string` để thay thế kiểm tra dữ liệu: khẳng định kiểu không biến số thành chuỗi và không xác thực giá trị. [Tham khảo: unknown](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type).

## 8. Cách thực hành

Các khối code trong tài liệu là ví dụ độc lập. Sao chép từng khối vào `index.ts`, thay cho ví dụ cũ để tránh khai báo trùng tên. Các dòng sai có chủ ý đã được đặt trong comment.

Với dự án hiện tại, `tsconfig.json` đã bao gồm `index.ts`. Có thể bổ sung hai tùy chọn sau vào `compilerOptions`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "outDir": "./dist",
    "strict": true,
    "noEmitOnError": true
  },
  "include": ["index.ts"]
}
```

`strict` bật nhóm kiểm tra kiểu chặt chẽ. `noEmitOnError` ngăn tạo JavaScript mới khi có lỗi biên dịch; nó không xóa file JavaScript cũ. [Tham khảo: strict](https://www.typescriptlang.org/tsconfig/strict.html), [Tùy chọn trình biên dịch](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

Nếu lệnh `tsc` đã có trên máy, chạy từ thư mục dự án:

```powershell
tsc --project tsconfig.json
```

Chỉ khi biên dịch thành công, chạy:

```powershell
node dist/index.js
```

Nếu chưa dùng được `tsc`, có thể thực hành trực tiếp tại [TypeScript Playground](https://www.typescriptlang.org/play), bật `strict` trong phần cấu hình.

## 9. Năm bài tập cơ bản

Hãy tự làm trước khi xem gợi ý. Mỗi bài thực hiện trong một lần thay nội dung `index.ts`.

### Bài tập 1 — Thông tin học viên và điểm trung bình

**Kiến thức:** `string`, `number`, `boolean`, mảng.

**Yêu cầu:**

1. Khai báo tên học viên, tuổi và mảng điểm với kiểu phù hợp.
2. Với điểm `[7, 8, 9]`, tính điểm trung bình bằng vòng lặp.
3. Tạo biến `isPassed: boolean`, bằng `true` nếu trung bình từ `5` trở lên.
4. In tên, tuổi, điểm trung bình và kết quả đạt hay chưa đạt.
5. Giả sử mảng điểm luôn có ít nhất một phần tử.

**Code khởi đầu:**

```ts
const fullName: string = "Phạm Thiên Bảo";
const age: number = 20;
const scores: number[] = [7, 8, 9];

// TODO: Tính tổng và điểm trung bình.
// TODO: Khai báo isPassed rồi in kết quả.
```

**Kết quả cần đạt:** trung bình `8`, `isPassed` là `true`.

**Tự kiểm tra:** đổi điểm thành `[3, 4, 5]`; trung bình phải là `4`, kết quả `false`.

### Bài tập 2 — Tuple thông tin sản phẩm

**Kiến thức:** tuple, kiểu trả về của hàm, destructuring.

**Yêu cầu:**

1. Viết hàm `getProduct()` trả về tuple `[string, number, boolean]`.
2. Ba vị trí lần lượt là tên, giá, còn hàng hay không.
3. Trả về `["Bàn phím", 350000, true]`.
4. Dùng destructuring để tạo `productName`, `price`, `inStock`, rồi in ra.
5. Thử đảo giá và tên để quan sát lỗi; sau đó sửa lại.

**Code khởi đầu:**

```ts
function getProduct(): [string, number, boolean] {
  // TODO: Thay dòng bên dưới bằng return đúng yêu cầu.
  throw new Error("Chưa hoàn thành bài 2");
}

// TODO: Gọi hàm, destructuring và in kết quả.
```

**Kết quả cần đạt:** `Bàn phím`, `350000`, `true`.

### Bài tập 3 — Trạng thái đơn hàng bằng enum

**Kiến thức:** numeric enum, string enum.

**Yêu cầu:**

1. Tạo numeric enum `Priority` với `Low = 1`, `Medium`, `High`.
2. In `Priority.High` và `Priority[2]`.
3. Tạo string enum `OrderStatus` gồm `Pending = "PENDING"`, `Paid = "PAID"`, `Cancelled = "CANCELLED"`.
4. Tạo biến có kiểu `OrderStatus`, gán `OrderStatus.Paid`.
5. Nếu trạng thái là `Paid`, in `"Đã thanh toán"`.

**Code khởi đầu:**

```ts
// TODO: Khai báo hai enum.
// TODO: In giá trị số và tên thành viên.
// TODO: Khai báo trạng thái đơn hàng và kiểm tra bằng if.
```

**Kết quả cần đạt:** `3`, `"Medium"`, `"Đã thanh toán"`.

### Bài tập 4 — Nhận diện rủi ro của `any`

**Kiến thức:** `any`, lỗi kiểm tra kiểu, lỗi runtime.

**Yêu cầu:**

1. Khai báo `data: any`, lần lượt gán `"TypeScript"`, `100`, `false`; in sau mỗi lần gán.
2. Gán `data = 100`, thử gọi `data.toUpperCase()`.
3. Ghi lại: trình kiểm tra kiểu có báo lỗi không, và khi chạy xảy ra chuyện gì?
4. Comment dòng gây lỗi sau khi quan sát.
5. Tạo một biến `safeData: unknown = 100`; dùng `typeof` để chỉ gọi `toUpperCase()` khi là chuỗi, trường hợp khác in `"Không phải chuỗi"`.

**Code khởi đầu:**

```ts
let data: any = "TypeScript";
console.log(data);

// TODO: Gán tiếp số và boolean.
// TODO: Thử thao tác sai với any, rồi comment lại.

const safeData: unknown = 100;
// TODO: Kiểm tra kiểu trước khi xử lý.
```

**Kết quả cần nhận ra:** `any` cho phép lời gọi sai vượt qua kiểm tra kiểu; số không có phương thức `toUpperCase()`. Phiên bản dùng `unknown` và kiểm tra đúng sẽ in `"Không phải chuỗi"`.

### Bài tập 5 — Xử lý đầu vào chưa rõ kiểu

**Kiến thức:** `unknown`, `typeof`, nhánh điều kiện.

**Yêu cầu:** viết `processInput(value: unknown): string` theo bảng sau. Không dùng `any` hoặc `as` trong lời giải.

| Kiểu đầu vào | Xử lý | Ví dụ kết quả |
| --- | --- | --- |
| Chuỗi | Bỏ khoảng trắng ở hai đầu, chuyển thành chữ hoa | `"  hello  "` → `"HELLO"` |
| Số | Nhân đôi rồi đổi kết quả thành chuỗi | `10` → `"20"` |
| Boolean | Trả về chuỗi mô tả | `true` → `"Đúng"`, `false` → `"Sai"` |
| Các kiểu còn lại | Trả về thông báo | `null` → `"Không hỗ trợ"` |

**Code khởi đầu:**

```ts
function processInput(value: unknown): string {
  // TODO: Thay phần thân bằng các nhánh typeof phù hợp.
  return "Chưa hoàn thành";
}

console.log(processInput("  hello  ")); // Mong đợi: HELLO
console.log(processInput(10));          // Mong đợi: 20 (chuỗi)
console.log(processInput(true));        // Mong đợi: Đúng
console.log(processInput(false));       // Mong đợi: Sai
console.log(processInput(null));        // Mong đợi: Không hỗ trợ
console.log(processInput([1, 2]));       // Mong đợi: Không hỗ trợ
```

**Gợi ý:** dùng `.trim()`, `.toUpperCase()` và `String(value * 2)` ở đúng nhánh kiểu. Kiểm tra thêm với `0`, `""` và `undefined`; kết quả lần lượt là `"0"`, `""`, `"Không hỗ trợ"`.

## 10. Năm câu hỏi lý thuyết

1. `let age = 20` và `let age: number = 20` khác nhau về cách xác định kiểu như thế nào? Có thể gán `age = "20"` trong hai trường hợp này không?
2. Mảng `number[]` khác tuple `[string, number]` ở đâu? Vì sao `[20, "Bảo"]` không phù hợp với tuple đó? Tuple có tự đóng băng mảng lúc chạy không?
3. Với `enum Direction { Up, Down, Left, Right }`, giá trị của `Right` và `Direction[1]` là gì? String enum có tự tạo ánh xạ ngược tương tự không?
4. `any` và `unknown` đều nhận được mọi kiểu giá trị. Vậy sự khác biệt khi gọi phương thức trên chúng là gì? Nên chọn kiểu nào cho dữ liệu chưa được xác thực?
5. Tại sao kiểm tra `typeof input === "string"` cho phép gọi `input.toUpperCase()` khi `input` có kiểu `unknown`? `input as string` có kiểm tra hoặc chuyển đổi dữ liệu lúc chạy không?

<details>
<summary>Đáp án gợi ý — mở sau khi tự trả lời</summary>

1. Trường hợp đầu suy luận kiểu, trường hợp sau khai báo rõ kiểu. Cả hai biến đều có kiểu `number`, nên không nhận chuỗi `"20"`.
2. Mảng số chứa các phần tử số với số lượng không quy định cụ thể. Tuple trên mô tả hai vị trí theo thứ tự chuỗi rồi số, nên `[20, "Bảo"]` sai kiểu ở cả hai vị trí. Tuple không tự đóng băng mảng khi chạy.
3. `Right` là `3`; `Direction[1]` là `"Down"`. String enum không tự tạo ánh xạ ngược.
4. `any` cho phép gọi phương thức mà không cần chứng minh kiểu; lỗi có thể xuất hiện khi chạy. `unknown` yêu cầu thu hẹp kiểu trước thao tác đặc thù. Ưu tiên `unknown` cho dữ liệu chưa được xác thực và kiểm tra nó trước khi xử lý.
5. Điều kiện đó là một type guard, giúp TypeScript biết `input` là chuỗi trong nhánh đúng. `as string` chỉ khẳng định kiểu với trình kiểm tra; nó không xác thực hay chuyển đổi dữ liệu lúc chạy.

</details>

## 11. Tự đánh giá sau bài học

- [ ] Tôi khai báo được số, chuỗi, boolean và mảng.
- [ ] Tôi phân biệt được khai báo kiểu và suy luận kiểu.
- [ ] Tôi tạo được tuple và lấy phần tử bằng destructuring.
- [ ] Tôi dùng được numeric enum và string enum.
- [ ] Tôi giải thích được vì sao `any` có thể che giấu lỗi.
- [ ] Tôi kiểm tra `unknown` bằng `typeof` trước khi xử lý.
- [ ] Tôi hoàn thành 5 bài tập và tự trả lời 5 câu hỏi.

Sau bài này, có thể học tiếp `null`, `undefined`, union types, object types, `type` và `interface`. Giữ các chủ đề đó thành bài riêng để luyện chắc kiến thức hiện tại.
