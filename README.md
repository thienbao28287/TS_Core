# Bài 3 — Function và Generics trong TypeScript

## 1. Mục tiêu bài học

Sau bài học, bạn có thể:

- Khai báo kiểu cho tham số và giá trị trả về.
- Sử dụng tham số tùy chọn, mặc định và rest.
- Phân biệt `void` và `never`.
- Mô tả kiểu hàm bằng interface hoặc type alias.
- Viết hàm generic với một hoặc nhiều tham số kiểu.
- Giới hạn tham số kiểu bằng `extends`.
- Sử dụng generics trong interface, type alias và class.

> Các ví dụ độc lập với nhau. Khi thực hành, chạy từng ví dụ để tránh trùng tên khai báo. Nên bật `"strict": true`.

---

## 2. Function trong TypeScript

### 2.1. Khai báo kiểu cho hàm

Có thể khai báo kiểu cho từng tham số và giá trị trả về.

```typescript
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(10, 5)); // 15

// Lỗi: tham số thứ hai phải là number.
// add(10, "5");
```

Trong ví dụ:

- `a: number`: tham số a phải là số.
- `b: number`: tham số b phải là số.
- `): number`: hàm trả về số.

Nếu đã khai báo trả về `number`, không thể trả về chuỗi.

```typescript
function subtract(a: number, b: number): number {
  return a - b;

  // Nếu thay return phía trên bằng dòng dưới sẽ sai kiểu:
  // return "Kết quả";
}
```

---

### 2.2. Suy luận kiểu trả về

TypeScript có thể suy luận kiểu từ phần thân hàm.

```typescript
function multiply(a: number, b: number) {
  return a * b;
}

const result = multiply(4, 5);

console.log(result); // 20
```

Kiểu trả về của `multiply` được suy luận là `number`.

Khi mới học, viết rõ kiểu trả về giúp bạn dễ kiểm tra ý định của hàm.

---

### 2.3. Arrow function

Arrow function cũng có thể khai báo đầy đủ kiểu.

```typescript
const divide = (a: number, b: number): number => {
  return a / b;
};

console.log(divide(10, 2)); // 5
```

Với biểu thức đơn giản, có thể viết ngắn:

```typescript
const square = (value: number): number => value * value;

console.log(square(5)); // 25
```

---

### 2.4. Tham số tùy chọn — Optional parameter

Dùng `?` để cho phép bỏ qua tham số.

```typescript
function introduce(name: string, age?: number): string {
  if (age !== undefined) {
    return `${name}, ${age} tuổi`;
  }

  return name;
}

console.log(introduce("Bao"));     // Bao
console.log(introduce("Bao", 20)); // Bao, 20 tuổi
console.log(introduce("An", 0));   // An, 0 tuổi
```

Trong thân hàm, `age` có thể là `number` hoặc `undefined`.

Lưu ý:

- Tham số tùy chọn đứng sau các tham số bắt buộc thông thường.
- Nên kiểm tra `age !== undefined` nếu muốn chấp nhận cả số `0`.
- `if (age)` sẽ coi `0` là falsy, nên không phù hợp trong ví dụ này.

```typescript
// Sai: tham số bắt buộc đứng sau tham số tùy chọn.
// function introduce(age?: number, name: string): string {
//   return name;
// }
```

---

### 2.5. Tham số mặc định — Default parameter

Dùng `=` để đặt giá trị mặc định.

```typescript
function greet(name: string = "Bạn"): string {
  return `Xin chào ${name}`;
}

console.log(greet());          // Xin chào Bạn
console.log(greet("Bao"));     // Xin chào Bao
console.log(greet(undefined)); // Xin chào Bạn
console.log(greet(""));        // Xin chào 
```

Giá trị mặc định được dùng khi:

- Không truyền đối số tương ứng.
- Truyền `undefined`.

Chuỗi rỗng `""`, số `0` và `false` không tự kích hoạt giá trị mặc định.

Không viết đồng thời `?` và giá trị mặc định cho cùng một tham số.

```typescript
// Không hợp lệ:
// function greet(name?: string = "Bạn") {}
```

---

### 2.6. Tham số rest

Rest parameter gom nhiều đối số thành một mảng.

```typescript
function sum(...numbers: number[]): number {
  let total = 0;

  for (const value of numbers) {
    total += value;
  }

  return total;
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(5, 10));   // 15
console.log(sum());       // 0
```

`numbers` có kiểu `number[]`.

> Rest parameter phải đứng cuối danh sách tham số.

---

## 3. Void và Never

### 3.1. Void

Dùng `void` khi hàm không cung cấp kết quả hữu ích cho nơi gọi.

```typescript
function printMessage(message: string): void {
  console.log(message);
}

printMessage("Đang học TypeScript");
```

Hàm này thực hiện việc in thông báo rồi kết thúc bình thường.

Có thể dùng `return;` để kết thúc sớm:

```typescript
function printName(name: string): void {
  if (name === "") {
    return;
  }

  console.log(name);
}

printName("Bao"); // Bao
printName("");    // Không in gì
```

Với hàm được chú thích trực tiếp là `void`, không trả về một số hoặc chuỗi:

```typescript
// Lỗi:
// function printMessage(): void {
//   return 123;
// }
```

### Lưu ý thêm về kiểu hàm trả về void

Khi gán một hàm vào kiểu `() => void`, TypeScript có thể chấp nhận hàm thực tế trả về giá trị. Khi gọi thông qua kiểu đó, kết quả được xem là `void`.

```typescript
const action: () => void = () => 123;

const result = action(); // Kiểu của result là void

// Không được dùng result như một số:
// console.log(result + 1);
```

Phần này thường gặp với callback; không có nghĩa `void` tự xóa giá trị trả về lúc runtime.

---

### 3.2. Never

Dùng `never` khi hàm không thể hoàn tất bằng cách trả về bình thường.

Ví dụ: hàm luôn ném lỗi.

```typescript
function fail(message: string): never {
  throw new Error(message);
}

// Bỏ comment để quan sát lỗi:
// fail("Dữ liệu không hợp lệ");
```

Sau lời gọi `fail()`, luồng thực thi không tiếp tục bình thường. Lỗi có thể được bắt bởi `try...catch` ở bên ngoài.

Một hàm có vòng lặp vô hạn cũng có thể trả về `never`, nhưng không cần chạy ví dụ đó khi học.

### 3.3. So sánh

| Tiêu chí | `void` | `never` |
| --- | --- | --- |
| Ý nghĩa | Không cung cấp kết quả hữu ích | Không trả về bình thường |
| Có thể chạy xong bình thường | Có | Không |
| Ví dụ | In thông báo | Luôn ném lỗi |
| Mục đích | Thể hiện hàm dùng để thực hiện hành động | Thể hiện nhánh thực thi không tiếp tục bình thường |

---

## 4. Định nghĩa kiểu hàm

### 4.1. Dùng type alias

```typescript
type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => a - b;
const multiply: MathOperation = (a, b) => a * b;

console.log(subtract(10, 5)); // 5
console.log(multiply(10, 5)); // 50
```

TypeScript suy luận kiểu của `a` và `b` từ `MathOperation`.

### 4.2. Dùng interface

```typescript
interface MathOperation {
  (a: number, b: number): number;
}

const add: MathOperation = (a, b) => a + b;

console.log(add(10, 5)); // 15
```

Chú ý cú pháp:

```typescript
// Type alias dùng =>
type OperationType = (a: number, b: number) => number;

// Chữ ký gọi trong interface dùng :
interface OperationInterface {
  (a: number, b: number): number;
}
```

### 4.3. Hàm nhận một hàm khác — Callback

```typescript
type MathOperation = (a: number, b: number) => number;

function calculate(
  a: number,
  b: number,
  operation: MathOperation,
): number {
  return operation(a, b);
}

const add: MathOperation = (a, b) => a + b;

console.log(calculate(10, 5, add)); // 15
console.log(calculate(10, 5, (a, b) => a - b)); // 5
```

`operation` là callback: hàm được truyền vào một hàm khác.

---

## 5. Generics

### 5.1. Định nghĩa

Generics cho phép khai báo tham số kiểu để tái sử dụng một cấu trúc hoặc logic với nhiều kiểu dữ liệu.

Ví dụ phổ biến:

```typescript
function identity<T>(value: T): T {
  return value;
}
```

Ý nghĩa:

- `<T>`: khai báo một tham số kiểu tên là T.
- `value: T`: tham số value có kiểu T.
- `: T`: kết quả trả về có kiểu T.

`T` là tên do người viết chọn. Có thể dùng tên khác như `Value`, `Item` hoặc `Data`.

```typescript
function identity<Value>(value: Value): Value {
  return value;
}
```

---

### 5.2. Truyền kiểu rõ ràng

```typescript
function identity<T>(value: T): T {
  return value;
}

const numberValue = identity<number>(10);
const stringValue = identity<string>("Hello");
const booleanValue = identity<boolean>(true);

console.log(numberValue);  // 10
console.log(stringValue);  // Hello
console.log(booleanValue); // true

// Lỗi: đã chọn T là number nên đối số phải là số.
// identity<number>("10");
```

---

### 5.3. Suy luận tham số kiểu

Không phải lúc nào cũng cần viết `<number>` hoặc `<string>`.

```typescript
function identity<T>(value: T): T {
  return value;
}

const message = identity("Hello");
const user = identity({
  id: 1,
  name: "Bao",
});

console.log(message.toUpperCase()); // HELLO
console.log(user.name);             // Bao

// Lỗi: đối tượng không có thuộc tính salary.
// console.log(user.salary);
```

TypeScript suy luận tham số kiểu từ dữ liệu truyền vào.

> Generics không chỉ áp dụng cho number và string.

---

### 5.4. Generics khác any như thế nào?

```typescript
function identityAny(value: any): any {
  return value;
}

function identityGeneric<T>(value: T): T {
  return value;
}

const first = identityAny(10);
const second = identityGeneric<number>(10);

// Được trình kiểm tra kiểu cho phép,
// nhưng nếu chạy sẽ gặp lỗi:
// first.toUpperCase();

// Bị TypeScript phát hiện là sai kiểu:
// second.toUpperCase();

console.log(second.toFixed(2)); // 10.00
```

| Cách khai báo | Kiểu kết quả |
| --- | --- |
| `(value: any): any` | Kết quả là any, mất thông tin kiểu cụ thể |
| `<T>(value: T): T` | Kết quả gắn với tham số kiểu T |

Điểm quan trọng của generics là thể hiện quan hệ giữa các kiểu, không chỉ chấp nhận nhiều kiểu dữ liệu.

---

## 6. Generics với mảng

### 6.1. Đưa một giá trị vào mảng

```typescript
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const numbers = wrapInArray(10);
const names = wrapInArray("Bao");

console.log(numbers); // [10]
console.log(names);   // ["Bao"]

// Lỗi: numbers là mảng số.
// numbers.push("Hello");
```

### 6.2. Lấy phần tử đầu tiên

Mảng có thể rỗng, nên cần thể hiện khả năng trả về `undefined`.

```typescript
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = getFirst([10, 20, 30]);
const firstName = getFirst(["Bao", "An"]);
const emptyResult = getFirst<number>([]);

console.log(firstNumber); // 10
console.log(firstName);   // Bao
console.log(emptyResult); // undefined
```

Kiểm tra trước khi dùng kết quả:

```typescript
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const first = getFirst([10, 20]);

if (first !== undefined) {
  console.log(first.toFixed(2)); // 10.00
}
```

> Không nên khai báo trả về T nếu hàm thực tế có thể trả về undefined.

---

## 7. Generics với nhiều tham số kiểu

Có thể dùng nhiều tham số kiểu khi các vị trí có vai trò độc lập.

```typescript
function createPair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const firstPair = createPair<string, number>("Bao", 20);
const secondPair = createPair(1, true);

console.log(firstPair);  // ["Bao", 20]
console.log(secondPair); // [1, true]
```

Trong `firstPair`:

- `T` là `string`.
- `U` là `number`.
- Kết quả có kiểu `[string, number]`.

`T` và `U` cũng có thể là cùng một kiểu:

```typescript
function createPair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const pair = createPair("Bao", "An");

console.log(pair); // ["Bao", "An"]
```

> Hai tham số kiểu khác tên không có nghĩa chúng bắt buộc phải nhận hai kiểu khác nhau.

---

## 8. Giới hạn kiểu generic — Constraints

### 8.1. Vì sao cần giới hạn?

Khi chưa có ràng buộc, `T` có thể là kiểu bất kỳ. Không thể giả định giá trị có thuộc tính `length`.

```typescript
function inspect<T>(value: T): T {
  // Lỗi: chưa biết T có length hay không.
  // console.log(value.length);

  return value;
}
```

### 8.2. Dùng extends để đặt ràng buộc

```typescript
interface HasLength {
  length: number;
}

function getLength<T extends HasLength>(value: T): number {
  return value.length;
}

console.log(getLength("Hello"));      // 5
console.log(getLength([10, 20, 30])); // 3
console.log(getLength({ length: 8 })); // 8

// Lỗi: number không đáp ứng HasLength.
// getLength(123);
```

`T extends HasLength` nghĩa là T phải có cấu trúc đáp ứng `HasLength`.

Đây là ràng buộc kiểu, không yêu cầu giá trị phải được tạo từ một class cụ thể.

### 8.3. Vừa giới hạn vừa giữ kiểu đầu vào

```typescript
function describeLength<T extends { length: number }>(
  value: T,
): [T, number] {
  return [value, value.length];
}

const [items, length] = describeLength(["Bao", "An"]);

console.log(items);  // ["Bao", "An"]
console.log(length); // 2

items.push("Binh"); // Hợp lệ vì items vẫn có kiểu mảng chuỗi
```

Nếu chỉ cần đọc `length` và trả về số, có thể viết đơn giản:

```typescript
function getLength(value: { length: number }): number {
  return value.length;
}
```

> Dùng generics khi cần giữ hoặc liên kết thông tin kiểu. Không cần thêm `<T>` vào mọi hàm.

---

## 9. Generics trong interface

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  success: true,
  data: {
    id: 1,
    name: "Bao",
  },
};

const scoresResponse: ApiResponse<number[]> = {
  success: true,
  data: [7, 8, 9],
};

console.log(userResponse.data.name); // Bao
console.log(scoresResponse.data);   // [7, 8, 9]
```

Với mỗi lần sử dụng `ApiResponse<T>`, thuộc tính `data` nhận kiểu tương ứng.

> Khai báo này mô tả cấu trúc dữ liệu; không tự xác thực phản hồi API khi chạy.

---

## 10. Generics trong type alias

### 10.1. Kiểu object

```typescript
type Box<T> = {
  value: T;
};

const numberBox: Box<number> = {
  value: 100,
};

const stringBox: Box<string> = {
  value: "TypeScript",
};

console.log(numberBox.value); // 100
console.log(stringBox.value); // TypeScript
```

### 10.2. Kiểu tuple

```typescript
type Pair<T, U> = [T, U];

const student: Pair<string, number> = ["Bao", 20];
const result: Pair<boolean, string> = [true, "Thành công"];

console.log(student);
console.log(result);
```

### 10.3. Kiểu hàm

```typescript
type Transformer<Input, Output> = (value: Input) => Output;

const getTextLength: Transformer<string, number> = (value) => {
  return value.length;
};

console.log(getTextLength("Hello")); // 5
```

Ở đây, kiểu đầu vào và đầu ra có thể khác nhau.

---

## 11. Generics trong class

Class cũng có thể nhận tham số kiểu.

```typescript
class ValueBox<T> {
  private value: T;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  getValue(): T {
    return this.value;
  }

  setValue(newValue: T): void {
    this.value = newValue;
  }
}

const numberBox = new ValueBox<number>(10);

numberBox.setValue(20);
console.log(numberBox.getValue()); // 20

// Lỗi: hộp này nhận number.
// numberBox.setValue("Hello");

const stringBox = new ValueBox<string>("Hello");

stringBox.setValue("TypeScript");
console.log(stringBox.getValue()); // TypeScript
```

Giải thích:

- `constructor`: khởi tạo dữ liệu khi dùng `new`.
- `private value`: thuộc tính chỉ được truy cập trực tiếp bên trong class theo kiểm tra kiểu.
- `getValue()`: đọc giá trị.
- `setValue()`: cập nhật giá trị đúng kiểu T.

Class `ValueBox` tồn tại lúc runtime. Tham số kiểu T chỉ phục vụ kiểm tra kiểu và không tồn tại như một giá trị JavaScript.

---

## 12. Phân biệt các cách khai báo hàm

Không nên so sánh “function” và “generics” như hai loại thay thế nhau.

Nên so sánh cách một hàm sử dụng kiểu:

| Cách viết | Ví dụ | Khi phù hợp |
| --- | --- | --- |
| Hàm với kiểu cụ thể | `(a: number, b: number) => number` | Phép tính với số |
| Hàm với union | `(value: string | number) => string` | Xử lý các kiểu đã xác định |
| Hàm generic | `<T>(value: T) => T` | Giữ quan hệ kiểu giữa đầu vào và kết quả |
| Generic có ràng buộc | `<T extends HasLength>(value: T) => T` | Giữ kiểu cụ thể và yêu cầu một cấu trúc chung |

Ví dụ:

```typescript
function double(value: number): number {
  return value * 2;
}

function toText(value: string | number): string {
  return String(value);
}

function identity<T>(value: T): T {
  return value;
}
```

Mỗi hàm trên đều có mục đích phù hợp riêng.

---

## 13. Năm bài tập thực hành

### Bài tập 1 — Tính tiền mua hàng

**Kiến thức:** kiểu tham số, kiểu trả về, tham số mặc định.

Viết hàm:

```typescript
function calculateTotal(
  price: number,
  quantity: number = 1,
): number {
  // TODO: Trả về tổng tiền.
  return 0;
}
```

**Yêu cầu:**

1. Trả về `price * quantity`.
2. Khi không truyền quantity, sử dụng số lượng mặc định là `1`.
3. Thử truyền chuỗi vào price để quan sát lỗi, rồi comment dòng đó.

**Các trường hợp cần kiểm tra:**

```typescript
console.log(calculateTotal(100000, 3)); // 300000
console.log(calculateTotal(100000));    // 100000
console.log(calculateTotal(100000, 0)); // 0
```

**Câu cần giải thích:** Vì sao truyền `0` không khiến quantity trở thành `1`?

---

### Bài tập 2 — Giới thiệu người dùng

**Kiến thức:** type alias cho hàm, tham số tùy chọn, void.

Khai báo kiểu:

```typescript
type FormatUser = (name: string, age?: number) => string;
```

**Yêu cầu:**

1. Tạo hàm `formatUser` theo kiểu trên.
2. Nếu có tuổi, trả về `"Bao - 20 tuổi"`.
3. Nếu không có tuổi, chỉ trả về tên.
4. Viết `printUser(name: string, age?: number): void`.
5. `printUser` gọi `formatUser` và in kết quả.

**Code khởi đầu:**

```typescript
type FormatUser = (name: string, age?: number) => string;

const formatUser: FormatUser = (name, age) => {
  // TODO: Xử lý trường hợp có và không có tuổi.
  return "Chưa hoàn thành";
};

function printUser(name: string, age?: number): void {
  // TODO: Gọi formatUser rồi in kết quả.
}

printUser("Bao", 20); // Bao - 20 tuổi
printUser("An");      // An
printUser("Binh", 0); // Binh - 0 tuổi
```

**Lưu ý:** Dùng `age !== undefined` để xử lý đúng số `0`.

---

### Bài tập 3 — Lấy phần tử cuối của mảng

**Kiến thức:** generic, mảng, union với undefined.

Viết hàm:

```typescript
function getLast<T>(items: T[]): T | undefined {
  // TODO: Trả về phần tử cuối hoặc undefined.
  return undefined;
}
```

**Yêu cầu:**

1. Dùng được với mảng số và mảng chuỗi.
2. Mảng rỗng trả về `undefined`.
3. Không sử dụng `any` hoặc `as`.
4. Kiểm tra kết quả khác `undefined` trước khi gọi phương thức riêng của kiểu đó.

**Các trường hợp cần kiểm tra:**

```typescript
console.log(getLast([10, 20, 30])); // 30
console.log(getLast(["Bao", "An"])); // An
console.log(getLast<number>([]));   // undefined
```

**Gợi ý:** Chỉ số cuối của mảng không rỗng là `items.length - 1`.

---

### Bài tập 4 — Tạo cặp dữ liệu

**Kiến thức:** nhiều tham số kiểu, type alias generic, tuple.

Khai báo:

```typescript
type Pair<T, U> = [T, U];
```

**Yêu cầu:**

1. Viết hàm `makePair<T, U>(first: T, second: U): Pair<T, U>`.
2. Trả về tuple chứa hai đối số theo đúng thứ tự.
3. Thử với chuỗi và số.
4. Thử với số và boolean.
5. Dùng destructuring lấy từng giá trị.

**Code khởi đầu:**

```typescript
type Pair<T, U> = [T, U];

function makePair<T, U>(first: T, second: U): Pair<T, U> {
  // TODO: Thay dòng dưới bằng return phù hợp.
  throw new Error("Chưa hoàn thành");
}

// TODO: Gọi makePair("Bao", 20).
// TODO: Gọi makePair(1, true).
// TODO: Destructuring và in kết quả.
```

**Kết quả mong đợi:**

```text
["Bao", 20]
[1, true]
```

---

### Bài tập 5 — Đóng gói dữ liệu có độ dài

**Kiến thức:** generic constraint, interface generic.

Khai báo:

```typescript
interface LengthResult<T> {
  value: T;
  length: number;
}
```

**Yêu cầu:**

1. Viết hàm `inspectLength<T extends { length: number }>`.
2. Nhận một giá trị có thuộc tính `length`.
3. Trả về `LengthResult<T>`.
4. Thuộc tính value chứa dữ liệu đầu vào.
5. Thuộc tính length chứa độ dài của dữ liệu đó.
6. Không sử dụng `any` hoặc ép kiểu.

**Code khởi đầu:**

```typescript
interface LengthResult<T> {
  value: T;
  length: number;
}

function inspectLength<T extends { length: number }>(
  value: T,
): LengthResult<T> {
  // TODO: Trả về object có value và length.
  throw new Error("Chưa hoàn thành");
}

// TODO: Thử với "Hello".
// TODO: Thử với [10, 20, 30].
// TODO: Thử truyền 123 để quan sát lỗi, rồi comment lại.
```

**Kết quả mong đợi:**

```text
{ value: "Hello", length: 5 }
{ value: [10, 20, 30], length: 3 }
```

**Tự kiểm tra thêm:** chuỗi rỗng và mảng rỗng đều có length bằng `0`.

---

## 14. Năm câu hỏi lý thuyết

### Câu 1

Tham số tùy chọn và tham số mặc định khác nhau thế nào?

Với `quantity: number = 1`, truyền `undefined` và truyền `0` có kết quả khác nhau ra sao?

### Câu 2

`void` và `never` khác nhau thế nào?

Vì sao một hàm luôn ném lỗi có thể khai báo trả về `never` dù nó không chạy mãi mãi?

### Câu 3

So sánh hai hàm sau:

```typescript
function first(value: any): any {
  return value;
}

function second<T>(value: T): T {
  return value;
}
```

Hàm nào giữ được quan hệ kiểu giữa đầu vào và đầu ra? Có bắt buộc viết rõ tham số kiểu trong mọi lời gọi generic không?

### Câu 4

`T extends { length: number }` có ý nghĩa gì?

Vì sao chuỗi và mảng đáp ứng ràng buộc này nhưng số `123` thì không?

### Câu 5

`<T, U>` cho phép điều gì so với chỉ dùng một tham số kiểu?

T và U có bắt buộc khác kiểu nhau không? Với `new ValueBox<number>(10)`, có thể gọi `setValue("Hello")` không?

---

## 15. Đáp án lý thuyết gợi ý

<details>
<summary>Mở sau khi tự trả lời</summary>

### Đáp án câu 1

Tham số tùy chọn có thể bị bỏ qua và khi đó nhận `undefined`.

Tham số mặc định sử dụng giá trị đã khai báo khi đối số bị bỏ qua hoặc là `undefined`.

Với `quantity: number = 1`:

- Truyền `undefined` → quantity bằng `1`.
- Truyền `0` → quantity bằng `0`.

### Đáp án câu 2

`void` biểu diễn việc không cung cấp kết quả hữu ích; hàm vẫn có thể kết thúc bình thường.

`never` biểu diễn việc hàm không trả về bình thường.

Ném lỗi chuyển luồng điều khiển sang cơ chế xử lý lỗi, nên hàm luôn ném lỗi có thể trả về `never`. Không cần phải chạy vô hạn.

### Đáp án câu 3

Hàm `second` giữ quan hệ kiểu qua T. Hàm `first` trả về any nên mất thông tin kiểu cụ thể.

Không phải lúc nào cũng cần viết rõ tham số kiểu. TypeScript thường suy luận được từ đối số và ngữ cảnh.

### Đáp án câu 4

Đây là ràng buộc yêu cầu T có thuộc tính length kiểu number.

Chuỗi và mảng có length. Số 123 không có thuộc tính phù hợp nên bị từ chối khi kiểm tra kiểu.

### Đáp án câu 5

T và U cho phép mô tả hai vai trò kiểu độc lập, chẳng hạn phần tử đầu và phần tử sau của tuple.

Chúng không bắt buộc khác kiểu; cả hai đều có thể là string.

Với `ValueBox<number>`, `setValue` yêu cầu number, nên truyền `"Hello"` sẽ sai kiểu.

</details>

---

## 16. Checklist ôn tập

- [ ] Tôi khai báo được kiểu tham số và kiểu trả về.
- [ ] Tôi dùng được tham số tùy chọn và mặc định.
- [ ] Tôi dùng được rest parameter.
- [ ] Tôi phân biệt được void và never.
- [ ] Tôi mô tả được kiểu hàm bằng interface hoặc type.
- [ ] Tôi hiểu callback là hàm được truyền vào hàm khác.
- [ ] Tôi giải thích được vai trò của T trong generics.
- [ ] Tôi biết khi nào TypeScript có thể suy luận tham số kiểu.
- [ ] Tôi viết được generic với nhiều tham số kiểu.
- [ ] Tôi dùng được extends để đặt ràng buộc.
- [ ] Tôi hiểu generics trong interface, type alias và class.
- [ ] Tôi hoàn thành 5 bài tập và trả lời 5 câu hỏi.

> Học tiếp sau bài này: function overloads, keyof, generic constraints với keyof và utility types. Không cần học tất cả ngay trong bài đầu về generics.