# Bài 1 — Kiểu dữ liệu cơ bản trong TypeScript

## 1. Mục tiêu bài học

Sau bài học, bạn có thể:

- Khai báo các kiểu `number`, `string`, `boolean` và mảng.
- Sử dụng tuple để nhóm các giá trị theo vị trí.
- Sử dụng numeric enum và string enum.
- Phân biệt `any` và `unknown`.
- Kiểm tra kiểu bằng `typeof` trước khi xử lý dữ liệu.


## 2. Khai báo kiểu và suy luận kiểu

### 2.1. Khai báo kiểu

Dùng dấu `:` sau tên biến để chỉ định kiểu dữ liệu.

```typescript
let age: number = 20;
let fullName: string = "Pham Thien Bao";
let isStudent: boolean = true;
```

### 2.2. Suy luận kiểu

TypeScript có thể tự xác định kiểu từ giá trị ban đầu.

```typescript
let score = 8.5; // Được suy luận là number

score = 9;

// Lỗi: không thể gán string cho number.
// score = "Chín";
```

> Không viết kiểu rõ ràng không đồng nghĩa với việc biến trở thành `any`.

### 2.3. Lỗi kiểm tra kiểu và lỗi runtime

- **Lỗi kiểm tra kiểu:** được TypeScript phát hiện khi phân tích code.
- **Lỗi runtime:** xảy ra khi chương trình thực sự chạy.

```typescript
let age: number = 20;

// TypeScript phát hiện lỗi kiểu:
// age = "Hai mươi";

const value: any = 123;

// TypeScript cho phép, nhưng khi chạy sẽ xảy ra TypeError:
// value.toUpperCase();
```

TypeScript không tự kiểm tra dữ liệu bên ngoài khi chạy. Chú thích kiểu được xóa khi biên dịch thành JavaScript.

---

## 3. Kiểu dữ liệu cơ bản

### 3.1. Number

`number` biểu diễn số nguyên và số thập phân.

```typescript
const age: number = 20;
const price: number = 150000;
const averageScore: number = 8.5;

console.log(age);
console.log(price);
console.log(averageScore);

// Sai kiểu:
// const quantity: number = "10";
```

### 3.2. String

`string` biểu diễn chuỗi ký tự.

```typescript
const fullName: string = "Pham Thien Bao";
const courseName: string = "TypeScript";

const introduction: string =
  `Xin chào ${fullName}, chào mừng đến với ${courseName}!`;

console.log(introduction);
```

### 3.3. Boolean

`boolean` chỉ có hai giá trị: `true` và `false`.

```typescript
const isStudent: boolean = true;
const isCompleted: boolean = false;

const score: number = 8;
const isPassed: boolean = score >= 5;

console.log(isStudent);  // true
console.log(isCompleted); // false
console.log(isPassed);   // true
```

> Dùng `number`, `string`, `boolean` viết thường khi khai báo các kiểu này.

### 3.4. Mảng — Array

Mảng chứa nhiều phần tử. Có hai cách khai báo thường gặp:

```typescript
const scores: number[] = [7, 8, 9];
const names: Array<string> = ["Bao", "An", "Binh"];
const results: boolean[] = [true, false, true];

scores.push(10);
names.push("Linh");

console.log(scores); // [7, 8, 9, 10]
console.log(names);  // ["Bao", "An", "Binh", "Linh"]
console.log(results.length); // 3

// Sai kiểu:
// scores.push("10");
```

`number[]` và `Array<number>` đều mô tả mảng số.

> `const` ngăn gán lại biến, nhưng không tự ngăn sửa phần tử hoặc gọi `push()` trên mảng.

---

## 4. Tuple

Tuple là kiểu mô tả số lượng phần tử và kiểu dữ liệu tại từng vị trí của một mảng.

Ví dụ `[string, number]` mô tả hai phần tử:

- Vị trí `0`: `string`.
- Vị trí `1`: `number`.

### 4.1. Đặc điểm

- Mỗi vị trí có kiểu dữ liệu xác định.
- Thứ tự phần tử quan trọng.
- Có thể nhóm các giá trị liên quan nhưng khác kiểu.
- Có thể dùng làm kiểu trả về của hàm.

### 4.2. Ví dụ

```typescript
let person: [string, number];

person = ["Pham Thien Bao", 20];

console.log(person[0]); // Pham Thien Bao
console.log(person[1]); // 20

// Sai thứ tự kiểu:
// person = [20, "Pham Thien Bao"];

// Thiếu phần tử:
// person = ["Pham Thien Bao"];

// Thừa phần tử:
// person = ["Pham Thien Bao", 20, true];
```

### 4.3. Tuple với hàm

```typescript
function getUser(): [string, number] {
  return ["Bao", 20];
}

const [userName, age] = getUser();

console.log(userName); // Bao
console.log(age);      // 20
```

Cú pháp `[userName, age]` được gọi là **destructuring**: lấy phần tử theo vị trí và gán vào biến.

### 4.4. Phân biệt mảng và tuple

| Tiêu chí | Mảng `number[]` | Tuple `[string, number]` |
| --- | --- | --- |
| Kiểu dữ liệu | Các phần tử đều là số | Vị trí đầu là chuỗi, vị trí sau là số |
| Số lượng | Không quy định cụ thể | Dạng này quy định hai phần tử |
| Trường hợp sử dụng | Danh sách điểm | Cặp tên và tuổi |

### 4.5. Lưu ý về độ dài và readonly

Tuple vẫn là mảng JavaScript khi chạy. Tuple có thể thay đổi vẫn cho phép một số thao tác như `push()`:

```typescript
const person: [string, number] = ["Bao", 20];

person.push(21);

console.log(person.length); // Khi chạy: 3
```

Có thể dùng `readonly` để ngăn thay đổi thông qua biến đó khi kiểm tra kiểu:

```typescript
const person: readonly [string, number] = ["Bao", 20];

// Lỗi kiểu:
// person.push(21);
// person[1] = 22;
```

> `readonly` không tự đóng băng dữ liệu lúc chạy. Tuple còn có phần tử tùy chọn và rest, sẽ học ở phần sau.

---

## 5. Enum

Enum, viết tắt của **enumeration**, định nghĩa một tập hợp các giá trị có tên.

Ví dụ sử dụng:

- Hướng di chuyển.
- Vai trò người dùng.
- Trạng thái đơn hàng.

### 5.1. Numeric enum

Nếu không chỉ định giá trị, phần tử đầu tiên bắt đầu từ `0`, các phần tử tiếp theo tăng thêm `1`.

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

console.log(Direction.Up);    // 0
console.log(Direction.Down);  // 1
console.log(Direction.Left);  // 2
console.log(Direction.Right); // 3
```

Numeric enum có ánh xạ ngược: tra tên thành viên từ giá trị số.

```typescript
console.log(Direction[0]); // "Up"
console.log(Direction[3]); // "Right"
```

Có thể đặt giá trị khởi đầu:

```typescript
enum Level {
  Beginner = 1,
  Intermediate,
  Advanced,
}

console.log(Level.Beginner);     // 1
console.log(Level.Intermediate); // 2
console.log(Level.Advanced);     // 3
```

### 5.2. String enum

String enum sử dụng giá trị chuỗi.

```typescript
enum TextDirection {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

const currentDirection: TextDirection = TextDirection.Up;

console.log(currentDirection); // "UP"
console.log(TextDirection.Left); // "LEFT"
```

> String enum không tự tạo ánh xạ ngược từ giá trị sang tên thành viên.

### 5.3. Enum hỗn hợp

Enum hỗn hợp chứa cả số và chuỗi.

```typescript
enum ResponseStatus {
  Success = 200,
  NotFound = "NOT_FOUND",
  Error = 500,
}

console.log(ResponseStatus.Success);  // 200
console.log(ResponseStatus.NotFound); // "NOT_FOUND"
console.log(ResponseStatus.Error);    // 500
```

Nên ưu tiên enum có kiểu giá trị nhất quán để dễ đọc và xử lý.

---

## 6. Any

`any` cho phép biến nhận giá trị thuộc bất kỳ kiểu dữ liệu nào.

```typescript
let dynamicVar: any;

dynamicVar = "Hello";
console.log(dynamicVar); // Hello

dynamicVar = true;
console.log(dynamicVar); // true

dynamicVar = 123;
console.log(dynamicVar); // 123
```

### Đặc điểm

- Có thể nhận nhiều kiểu giá trị.
- Bỏ qua nhiều kiểm tra kiểu đối với giá trị đó.
- Có thể che giấu lỗi và khiến lỗi xuất hiện khi chạy.

```typescript
const data: any = 100;

// TypeScript không báo lỗi kiểu cho lời gọi này.
// Nếu bỏ comment và chạy, chương trình sẽ gặp TypeError:
// console.log(data.toUpperCase());
```

> Hạn chế `any`. Nếu biết kiểu dữ liệu, hãy khai báo kiểu đó.

---

## 7. Unknown

`unknown` cũng nhận được mọi kiểu giá trị, nhưng yêu cầu xác định kiểu trước các thao tác đặc thù.

### 7.1. Ví dụ cơ bản

```typescript
let input: unknown;

input = "Hello";

// Không được gọi trực tiếp khi chưa xác định là chuỗi:
// console.log(input.toUpperCase());

if (typeof input === "string") {
  console.log(input.toUpperCase()); // HELLO
}
```

Kiểm tra `typeof` giúp TypeScript thu hẹp kiểu, gọi là **narrowing**.

### 7.2. Xử lý nhiều kiểu

```typescript
function printValue(value: unknown): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value * 2);
  } else if (typeof value === "boolean") {
    console.log(value ? "Đúng" : "Sai");
  } else {
    console.log("Chưa hỗ trợ kiểu dữ liệu này");
  }
}

printValue("hello"); // HELLO
printValue(10);      // 20
printValue(true);    // Đúng
printValue(null);    // Chưa hỗ trợ kiểu dữ liệu này
```

`void` cho biết hàm không trả về giá trị hữu ích.

### 7.3. So sánh any và unknown

| Tiêu chí | `any` | `unknown` |
| --- | --- | --- |
| Nhận mọi kiểu giá trị | Có | Có |
| Gọi trực tiếp phương thức chuỗi | Được trình kiểm tra kiểu cho phép | Cần xác định là chuỗi |
| Khả năng phát hiện thao tác sai kiểu | Hạn chế | Tốt hơn khi thu hẹp kiểu đúng |
| Dữ liệu chưa biết kiểu | Dễ bỏ sót lỗi | Nên ưu tiên và kiểm tra trước khi xử lý |

Có thể in giá trị `unknown` trực tiếp:

```typescript
const value: unknown = 123;
console.log(value); // Hợp lệ
```

> `as string` không thay thế việc kiểm tra dữ liệu. Nó không xác thực hoặc chuyển đổi dữ liệu lúc chạy.

---

## 8. Năm bài tập thực hành

### Bài tập 1 — Thông tin học viên

**Kiến thức:** `string`, `number`, `boolean`, mảng.

Khai báo:

- `fullName`: tên học viên.
- `age`: tuổi.
- `scores`: mảng điểm `[7, 8, 9]`.

**Yêu cầu:**

1. Khai báo kiểu dữ liệu phù hợp.
2. Tính điểm trung bình bằng vòng lặp.
3. Tạo biến `isPassed: boolean`, nhận `true` khi trung bình từ `5` trở lên.
4. In thông tin và kết quả.

**Code khởi đầu:**

```typescript
const fullName: string = "Pham Thien Bao";
const age: number = 20;
const scores: number[] = [7, 8, 9];

// TODO: Tính tổng điểm.
// TODO: Tính điểm trung bình.
// TODO: Khai báo isPassed.
// TODO: In kết quả.
```

**Kết quả mong đợi:**

- Điểm trung bình: `8`.
- `isPassed`: `true`.

Giả sử mảng điểm luôn có ít nhất một phần tử.

---

### Bài tập 2 — Tuple với hàm

**Kiến thức:** tuple, hàm, destructuring.

Viết hàm `getProduct()` trả về tuple gồm:

- Tên sản phẩm: `string`.
- Giá sản phẩm: `number`.
- Còn hàng: `boolean`.

**Yêu cầu:**

1. Trả về `["Laptop", 20000000, true]`.
2. Dùng destructuring lấy `productName`, `price`, `inStock`.
3. In các giá trị.
4. Thử đảo thứ tự tên và giá để quan sát lỗi, sau đó sửa lại.

**Code khởi đầu:**

```typescript
function getProduct(): [string, number, boolean] {
  // TODO: Thay dòng dưới bằng return đúng yêu cầu.
  throw new Error("Chưa hoàn thành");
}

// TODO: Gọi hàm và destructuring.
// TODO: In kết quả.
```

**Yêu cầu bổ sung:** Không sử dụng `any`.

---

### Bài tập 3 — Numeric enum và string enum

**Kiến thức:** enum và ánh xạ ngược.

**Yêu cầu:**

1. Tạo numeric enum `Role` gồm `Admin`, `User`, `Guest`.
2. In `Role.Admin`.
3. In tên thành viên có giá trị `0`.
4. Tạo string enum `OrderStatus`:
   - `Pending = "PENDING"`.
   - `Paid = "PAID"`.
   - `Cancelled = "CANCELLED"`.
5. Khai báo biến `orderStatus` có kiểu `OrderStatus`, gán `OrderStatus.Paid` và in ra.

**Kết quả mong đợi:**

```text
0
Admin
PAID
```

---

### Bài tập 4 — Quan sát any

**Kiến thức:** `any`, lỗi runtime.

**Yêu cầu:**

1. Tạo biến `data: any`.
2. Lần lượt gán `"Hello TypeScript"`, `100`, `true`.
3. In giá trị sau mỗi lần gán.
4. Gán lại `100` rồi thử gọi `data.toUpperCase()`.
5. Ghi nhận sự khác nhau giữa kiểm tra kiểu và kết quả khi chạy.
6. Comment dòng gây lỗi sau khi quan sát.

**Code khởi đầu:**

```typescript
let data: any;

// TODO: Gán chuỗi và in.
// TODO: Gán số và in.
// TODO: Gán boolean và in.

// TODO: Thử thao tác sai khi data là số.
```

**Câu cần giải thích:** Vì sao code có thể vượt qua kiểm tra kiểu nhưng vẫn gặp lỗi runtime?

---

### Bài tập 5 — Xử lý unknown

**Kiến thức:** `unknown`, `typeof`, điều kiện.

Viết hàm `processInput(value: unknown): string`.

**Quy tắc xử lý:**

| Đầu vào | Kết quả |
| --- | --- |
| Chuỗi | Bỏ khoảng trắng hai đầu và chuyển thành chữ hoa |
| Số | Nhân đôi rồi chuyển kết quả thành chuỗi |
| Boolean | `true` trả về `"Đúng"`, `false` trả về `"Sai"` |
| Kiểu khác | Trả về `"Không hỗ trợ"` |

**Code khởi đầu:**

```typescript
function processInput(value: unknown): string {
  // TODO: Kiểm tra typeof và xử lý từng trường hợp.
  return "Chưa hoàn thành";
}

console.log(processInput("  hello  ")); // HELLO
console.log(processInput(10));          // 20, dưới dạng chuỗi
console.log(processInput(true));        // Đúng
console.log(processInput(false));       // Sai
console.log(processInput(null));        // Không hỗ trợ
console.log(processInput([1, 2]));       // Không hỗ trợ
```

**Gợi ý:**

- Dùng `.trim()` và `.toUpperCase()` cho chuỗi.
- Dùng `String(value * 2)` trong nhánh số.
- Không dùng `any` hoặc `as` trong lời giải.

---

## 9. Năm câu hỏi lý thuyết

### Câu 1

Khai báo kiểu và suy luận kiểu khác nhau thế nào?

Với `let age = 20`, có thể gán tiếp `age = "20"` không? Vì sao?

### Câu 2

Mảng `number[]` khác tuple `[string, number]` ở đâu?

Vì sao `[20, "Bao"]` không phù hợp với tuple trên?

### Câu 3

Với khai báo sau, `Direction.Right` và `Direction[1]` có giá trị gì?

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

String enum có tự tạo ánh xạ ngược như numeric enum không?

### Câu 4

`any` và `unknown` đều nhận mọi kiểu giá trị. Chúng khác nhau thế nào khi gọi phương thức trên giá trị đó?

Nên chọn kiểu nào cho dữ liệu chưa biết kiểu?

### Câu 5

Tại sao kiểm tra `typeof value === "string"` cho phép gọi `value.toUpperCase()` với biến `unknown`?

Dùng `value as string` có kiểm tra hoặc chuyển đổi dữ liệu lúc chạy không?

---

## 10. Đáp án lý thuyết gợi ý

<details>
<summary>Mở sau khi tự trả lời</summary>

1. Khai báo kiểu là viết rõ kiểu sau dấu `:`; suy luận kiểu là để TypeScript xác định từ giá trị hoặc ngữ cảnh. `let age = 20` được suy luận là `number`, nên không thể gán chuỗi `"20"`.

2. `number[]` chứa các phần tử số với số lượng không quy định cụ thể. `[string, number]` mô tả hai phần tử theo thứ tự chuỗi rồi số. `[20, "Bao"]` sai kiểu tại cả hai vị trí.

3. `Direction.Right` là `3`; `Direction[1]` là `"Down"`. String enum không tự tạo ánh xạ ngược.

4. `any` cho phép gọi phương thức mà không cần chứng minh kiểu phù hợp. `unknown` yêu cầu thu hẹp kiểu trước thao tác đặc thù. Nên ưu tiên `unknown` khi chưa biết kiểu dữ liệu và kiểm tra trước khi xử lý.

5. `typeof value === "string"` là một type guard, giúp TypeScript xác định giá trị là chuỗi trong nhánh đúng. `as string` chỉ khẳng định kiểu với trình kiểm tra; không xác thực hay chuyển đổi dữ liệu khi chạy.

</details>

---

## 11. Checklist ôn tập

- [ ] Khai báo được `number`, `string`, `boolean`.
- [ ] Tạo và thao tác được với mảng.
- [ ] Hiểu thứ tự và kiểu dữ liệu của tuple.
- [ ] Biết dùng destructuring.
- [ ] Phân biệt numeric enum và string enum.
- [ ] Hiểu rủi ro khi dùng `any`.
- [ ] Xử lý được `unknown` bằng `typeof`.
- [ ] Hoàn thành 5 bài tập.
- [ ] Tự trả lời được 5 câu hỏi lý thuyết.

> Các ví dụ là những đoạn độc lập. Khi thực hành, chạy từng ví dụ để tránh khai báo trùng tên biến.