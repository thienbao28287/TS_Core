# Bài 2 — Interface và Type Alias trong TypeScript

## 1. Mục tiêu bài học

Sau bài học, bạn có thể:

- Mô tả cấu trúc đối tượng bằng `interface` và `type`.
- Sử dụng thuộc tính tùy chọn `?` và thuộc tính chỉ đọc `readonly`.
- Mở rộng interface bằng `extends`.
- Hiểu cơ chế hợp nhất khai báo interface.
- Phân biệt union `|` và intersection `&`.
- Lựa chọn `interface` hoặc `type` phù hợp.

> Cách thực hành: chạy riêng từng ví dụ để tránh trùng tên khai báo. Nên bật `"strict": true` trong `tsconfig.json`.

---

## 2. Interface

### 2.1. Định nghĩa

`interface` mô tả cấu trúc mà một giá trị phải đáp ứng.

Với đối tượng, interface thường quy định:

- Tên thuộc tính.
- Kiểu dữ liệu của thuộc tính.
- Thuộc tính bắt buộc hoặc tùy chọn.
- Thuộc tính chỉ đọc.
- Các phương thức.

Interface không tự tạo ra đối tượng hoặc giá trị mặc định.

### 2.2. Ví dụ cơ bản

```typescript
interface User {
  id: number;
  name: string;
  isActive: boolean;
}

const user: User = {
  id: 1,
  name: "Bao",
  isActive: true,
};

console.log(user.name);     // Bao
console.log(user.isActive); // true
```

Đối tượng `user` phải đáp ứng cấu trúc của `User`.

```typescript
interface User {
  id: number;
  name: string;
  isActive: boolean;
}

// Lỗi: thiếu thuộc tính isActive.
// const user: User = {
//   id: 1,
//   name: "Bao",
// };

// Lỗi: id phải là number.
// const anotherUser: User = {
//   id: "1",
//   name: "An",
//   isActive: true,
// };
```

---

### 2.3. Thuộc tính tùy chọn — Optional property

Dùng `?` để cho phép một thuộc tính được bỏ qua.

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

const userWithoutEmail: User = {
  id: 1,
  name: "Bao",
};

const userWithEmail: User = {
  id: 2,
  name: "An",
  email: "an@example.com",
};

console.log(userWithoutEmail.email); // undefined
console.log(userWithEmail.email);    // an@example.com
```

Khi bật kiểm tra null nghiêm ngặt, đọc `email` cho kết quả có kiểu `string | undefined`. Cần kiểm tra trước khi dùng phương thức chuỗi.

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

function printEmail(user: User): void {
  if (user.email !== undefined) {
    console.log(user.email.toLowerCase());
  } else {
    console.log("Chưa có email");
  }
}

printEmail({ id: 1, name: "Bao" });
// Chưa có email

printEmail({
  id: 2,
  name: "An",
  email: "AN@EXAMPLE.COM",
});
// an@example.com
```

> Thuộc tính tùy chọn không có nghĩa là có giá trị mặc định.

---

### 2.4. Thuộc tính chỉ đọc — Readonly

Dùng `readonly` để ngăn gán lại thuộc tính qua kiểu đã khai báo.

```typescript
interface User {
  readonly id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "Bao",
};

user.name = "Thien Bao"; // Hợp lệ

// Lỗi kiểm tra kiểu:
// user.id = 2;

console.log(user.name); // Thien Bao
```

#### Phân biệt const và readonly

| Cách dùng | Ý nghĩa |
| --- | --- |
| `const user = ...` | Không được gán lại biến `user` |
| `readonly id: number` | Không được gán lại thuộc tính `id` thông qua kiểu đó |

`readonly` không tự làm toàn bộ dữ liệu bên trong bất biến:

```typescript
interface Team {
  readonly members: string[];
}

const team: Team = {
  members: ["Bao"],
};

team.members.push("An"); // Hợp lệ

// Không được thay cả mảng:
// team.members = ["Binh"];
```

Muốn ngăn sửa phần tử qua thuộc tính này, dùng mảng chỉ đọc:

```typescript
interface Team {
  readonly members: readonly string[];
}

const team: Team = {
  members: ["Bao"],
};

// Lỗi kiểm tra kiểu:
// team.members.push("An");
```

> `readonly` là ràng buộc kiểm tra kiểu; không tự đóng băng đối tượng JavaScript khi chạy.

---

### 2.5. Mở rộng interface — Extends

Dùng `extends` để tạo interface mới dựa trên cấu trúc đã có.

```typescript
interface User {
  readonly id: number;
  name: string;
  isActive: boolean;
  email?: string;
}

interface Employee extends User {
  department: string;
  salary: number;
}

const employee: Employee = {
  id: 5,
  name: "Bao",
  isActive: true,
  email: "bao@example.com",
  department: "Engineering",
  salary: 7000,
};

console.log(employee.name);       // Bao
console.log(employee.department); // Engineering
console.log(employee.salary);     // 7000
```

`Employee` bao gồm thuộc tính từ `User` và các thuộc tính khai báo thêm.

Có thể mở rộng nhiều interface nếu các thành viên tương thích:

```typescript
interface Named {
  name: string;
}

interface Contactable {
  email: string;
}

interface Employee extends Named, Contactable {
  salary: number;
}

const employee: Employee = {
  name: "Bao",
  email: "bao@example.com",
  salary: 7000,
};

console.log(employee);
```

---

### 2.6. Hợp nhất khai báo — Declaration merging

Các khai báo interface cùng tên trong cùng phạm vi có thể hợp nhất.

```typescript
interface Employee {
  name: string;
}

interface Employee {
  department: string;
}

const employee: Employee = {
  name: "Bao",
  department: "Engineering",
};

console.log(employee.name);
console.log(employee.department);
```

Interface `Employee` sau khi hợp nhất yêu cầu cả `name` và `department`.

#### Điều kiện cần chú ý

Các thuộc tính dữ liệu trùng tên phải có kiểu và modifier tương thích.

```typescript
interface Profile {
  id: number;
}

// Nếu bỏ comment, sẽ có lỗi vì id được khai báo khác kiểu:
// interface Profile {
//   id: string;
// }
```

Merging không ghi đè kiểu của thuộc tính đã có.

#### Ví dụ kết hợp extends và merging

```typescript
interface User {
  readonly id: number;
  name: string;
  isActive: boolean;
  email?: string;
}

interface Employee {
  department: string;
}

interface Employee extends User {
  salary: number;
}

const employee: Employee = {
  id: 5,
  name: "Bao",
  isActive: true,
  email: "bao@example.com",
  salary: 7000,
  department: "Engineering",
};

console.log(employee);
```

Cấu trúc cuối cùng của `Employee` gồm:

- `id`, `name`, `isActive`, `email?` từ `User`.
- `department` từ khai báo đầu.
- `salary` từ khai báo thứ hai.

> Trong code thông thường, nếu không có nhu cầu merging, gom các thuộc tính vào một khai báo sẽ dễ theo dõi hơn.

---

### 2.7. Interface có phương thức

```typescript
interface Greeter {
  name: string;
  greet(): string;
}

const greeter: Greeter = {
  name: "Bao",

  greet() {
    return `Xin chào, tôi là ${this.name}`;
  },
};

console.log(greeter.greet());
// Xin chào, tôi là Bao
```

`greet(): string` mô tả phương thức không nhận tham số và trả về chuỗi.

### 2.8. Interface mô tả hàm

```typescript
interface AddFunction {
  (a: number, b: number): number;
}

const add: AddFunction = (a, b) => a + b;

console.log(add(3, 5)); // 8
```

Cú pháp bên trong `AddFunction` là chữ ký gọi hàm.

Với class, có thể dùng `implements` để yêu cầu class đáp ứng cấu trúc interface. Phần triển khai class sẽ học kỹ ở bài OOP.

---

## 3. Type Alias

### 3.1. Định nghĩa

Type alias dùng từ khóa `type` để đặt tên cho một kiểu.

Có thể đặt tên cho:

- Kiểu cơ bản.
- Object.
- Mảng và tuple.
- Hàm.
- Union.
- Intersection.

### 3.2. Đặt tên cho kiểu cơ bản

```typescript
type UserName = string;
type Age = number;

const userName: UserName = "Bao";
const age: Age = 20;

console.log(userName);
console.log(age);
```

`UserName` vẫn là bí danh của `string`; không trở thành kiểu riêng biệt với mọi chuỗi khác.

---

### 3.3. Type alias cho object

```typescript
type UserProfile = {
  readonly id: number;
  name: string;
  isActive: boolean;
  email?: string;
};

const user: UserProfile = {
  id: 1,
  name: "Bao",
  isActive: true,
};

user.name = "Thien Bao"; // Hợp lệ

// Lỗi:
// user.id = 2;

console.log(user);
```

Object type được đặt tên bằng `type` cũng hỗ trợ `?` và `readonly`.

---

### 3.4. Union type — Dấu |

Union cho phép giá trị thuộc ít nhất một trong các kiểu thành phần.

```typescript
type ID = number | string;

let userId: ID = 1;
userId = "USER-001";

// Lỗi:
// userId = true;
```

Cách đọc:

```text
number | string
```

Là: **số hoặc chuỗi**.

Muốn thực hiện thao tác riêng của một kiểu, cần thu hẹp kiểu trước:

```typescript
type ID = number | string;

function formatId(id: ID): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }

  return `ID-${id}`;
}

console.log(formatId("user-001")); // USER-001
console.log(formatId(5));          // ID-5
```

Có thể dùng union với các giá trị chuỗi cụ thể:

```typescript
type OrderStatus = "pending" | "paid" | "cancelled";

let orderStatus: OrderStatus = "pending";
orderStatus = "paid";

// Lỗi: không thuộc các giá trị cho phép.
// orderStatus = "shipping";
```

---

### 3.5. Intersection type — Dấu &

Intersection yêu cầu giá trị đáp ứng đồng thời tất cả các kiểu thành phần.

```typescript
type Person = {
  name: string;
  age: number;
};

type Contact = {
  email: string;
};

type ContactPerson = Person & Contact;

const person: ContactPerson = {
  name: "Bao",
  age: 20,
  email: "bao@example.com",
};

console.log(person);
```

Cách đọc:

```text
Person & Contact
```

Là: **vừa đáp ứng Person, vừa đáp ứng Contact**.

#### Union và intersection

| Kiểu | Ý nghĩa |
| --- | --- |
| `A | B` | Đáp ứng ít nhất một trong hai kiểu |
| `A & B` | Đáp ứng đồng thời cả hai kiểu |

#### Intersection không ghi đè thuộc tính

```typescript
type NumericId = {
  id: number;
};

type TextId = {
  id: string;
};

type ConflictingId = NumericId & TextId;
```

`ConflictingId.id` phải đồng thời là `number` và `string`, nên có kiểu `never`: không có giá trị hợp lệ đáp ứng yêu cầu này.

```typescript
// Đều không hợp lệ:
// const first: ConflictingId = { id: 1 };
// const second: ConflictingId = { id: "1" };
```

> Dấu `&` kết hợp yêu cầu về kiểu; không hoạt động như thao tác ghi đè thuộc tính của object.

---

### 3.6. Type alias cho tuple và hàm

```typescript
type ProductTuple = [string, number];

const product: ProductTuple = ["Laptop", 20000000];

console.log(product[0]); // Laptop
console.log(product[1]); // 20000000
```

```typescript
type CalculateTotal = (price: number, quantity: number) => number;

const calculateTotal: CalculateTotal = (price, quantity) => {
  return price * quantity;
};

console.log(calculateTotal(100000, 3)); // 300000
```

---

## 4. Kết hợp interface và type alias

Có thể dùng cả hai trong cùng chương trình.

### 4.1. Interface sử dụng type alias

```typescript
type ID = number | string;
type UserRole = "admin" | "member";

interface User {
  readonly id: ID;
  name: string;
  role: UserRole;
}

const user: User = {
  id: "USER-001",
  name: "Bao",
  role: "admin",
};

console.log(user);
```

### 4.2. Dùng interface trong intersection

```typescript
interface User {
  id: number;
  name: string;
}

type Employee = User & {
  department: string;
  salary: number;
};

const employee: Employee = {
  id: 1,
  name: "Bao",
  department: "Engineering",
  salary: 7000,
};

console.log(employee);
```

### 4.3. Interface mở rộng object type alias

```typescript
type Person = {
  name: string;
};

interface Employee extends Person {
  salary: number;
}

const employee: Employee = {
  name: "Bao",
  salary: 7000,
};

console.log(employee);
```

Interface có thể mở rộng object type phù hợp có các thành viên xác định. Không thể trực tiếp `extends` một union như `string | number`.

---

## 5. So sánh interface và type alias

| Tiêu chí | Interface | Type alias |
| --- | --- | --- |
| Từ khóa | `interface` | `type` |
| Mô tả object | Có | Có |
| Thuộc tính `?`, `readonly` | Có | Có, trong object type |
| Mô tả hàm | Có, qua chữ ký gọi | Có, qua function type |
| Đặt tên cho kiểu cơ bản | Không trực tiếp | Có |
| Đặt tên trực tiếp cho union | Không | Có |
| Mở rộng hoặc kết hợp cấu trúc | `extends` | `&` |
| Hợp nhất khai báo cùng tên | Có, khi hợp lệ | Không |
| Tồn tại như giá trị lúc runtime | Không | Không |
| Tự xác thực dữ liệu API | Không | Không |

### Lưu ý về type alias trùng tên

```typescript
type User = {
  name: string;
};

// Lỗi khai báo trùng tên:
// type User = {
//   age: number;
// };
```

Muốn kết hợp, tạo một kiểu mới:

```typescript
type User = {
  name: string;
};

type UserWithAge = User & {
  age: number;
};

const user: UserWithAge = {
  name: "Bao",
  age: 20,
};
```

---

## 6. Khi nào dùng interface, khi nào dùng type?

### Ưu tiên interface khi

- Mô tả cấu trúc object.
- Muốn thể hiện quan hệ mở rộng bằng `extends`.
- Cần declaration merging.

### Ưu tiên type khi

- Đặt tên cho union, tuple hoặc kiểu cơ bản.
- Kết hợp các kiểu bằng intersection.
- Muốn viết kiểu hàm theo cú pháp `(thamSố) => kiểuTrảVề`.

Với object thông thường, cả hai đều dùng được. Chọn theo nhu cầu và giữ cách viết nhất quán trong dự án.

### Lưu ý về runtime

`interface` và `type` phục vụ kiểm tra kiểu, không tự kiểm tra giá trị từ API hay dữ liệu người dùng.

Ví dụ, khai báo `email: string` không tự xác nhận chuỗi đó là địa chỉ email hợp lệ. Việc xác thực dữ liệu cần code xử lý khi chạy.

---

## 7. Năm bài tập thực hành

### Bài tập 1 — Hồ sơ sinh viên

**Kiến thức:** interface, optional, readonly.

Tạo interface `Student` có:

| Thuộc tính | Kiểu | Yêu cầu |
| --- | --- | --- |
| `id` | `number` | Chỉ đọc |
| `name` | `string` | Bắt buộc |
| `age` | `number` | Bắt buộc |
| `email` | `string` | Tùy chọn |

**Yêu cầu:**

1. Tạo sinh viên thứ nhất có email.
2. Tạo sinh viên thứ hai không có email.
3. Viết hàm `printStudent(student: Student): void`.
4. In tên và email; nếu thiếu email thì in `"Chưa có email"`.
5. Thử sửa `id` để quan sát lỗi, sau đó comment dòng đó.

**Dữ liệu gợi ý:**

```text
Sinh viên 1: id = 1, name = "Bao", age = 20,
             email = "bao@example.com"

Sinh viên 2: id = 2, name = "An", age = 19
```

**Code khởi đầu:**

```typescript
// TODO: Khai báo interface Student.
// TODO: Tạo hai đối tượng.

// TODO: Viết hàm printStudent.
// TODO: Gọi hàm với từng sinh viên.
```

---

### Bài tập 2 — Nhân viên và mở rộng interface

**Kiến thức:** extends.

Tạo interface `Person` có:

- `readonly id: number`.
- `name: string`.

Tạo interface `Employee extends Person`, bổ sung:

- `department: string`.
- `salary: number`.

**Yêu cầu:**

1. Tạo nhân viên tên `"Bao"`, phòng ban `"Engineering"`, lương `7000`.
2. Viết hàm `getAnnualSalary(employee: Employee): number`.
3. Hàm trả về lương tháng nhân `12`.
4. In tên và lương năm.

**Kết quả mong đợi:**

```text
Bao
84000
```

**Code khởi đầu:**

```typescript
// TODO: Khai báo Person.
// TODO: Khai báo Employee extends Person.
// TODO: Tạo employee.


// TODO: Viết getAnnualSalary.
// TODO: In kết quả.
```

---

### Bài tập 3 — Hợp nhất interface

**Kiến thức:** declaration merging.

Khai báo interface `AppConfig` hai lần trong cùng file và cùng phạm vi:

- Lần đầu: `appName: string`.
- Lần sau: `version: string` và `debug?: boolean`.

**Yêu cầu:**

1. Tạo đối tượng `config` đáp ứng interface đã hợp nhất.
2. Sử dụng `appName = "TS Core"` và `version = "1.0.0"`.
3. In tên ứng dụng và phiên bản.
4. Thử bỏ `version` để quan sát lỗi.
5. Thử thêm một khai báo có `version: number` để quan sát xung đột, rồi comment lại.

**Kết quả mong đợi:**

```text
TS Core
1.0.0
```

**Câu cần giải thích:** Vì sao hai khai báo interface cùng tên này hợp lệ, nhưng hai type alias cùng tên thì không?

---

### Bài tập 4 — Union cho mã và trạng thái đơn hàng

**Kiến thức:** type alias, union, narrowing.

Khai báo:

```typescript
type OrderId = number | string;
type OrderStatus = "pending" | "paid" | "cancelled";
```

**Yêu cầu:**

1. Viết hàm `formatOrderId(id: OrderId): string`.
2. Nếu là số, trả về `"ORDER-"` ghép với số đó.
3. Nếu là chuỗi, trả về chuỗi viết hoa.
4. Tạo type `Order` có `readonly id: OrderId` và `status: OrderStatus`.
5. Tạo một đơn hàng và đổi trạng thái từ `"pending"` sang `"paid"`.

**Code khởi đầu:**

```typescript
type OrderId = number | string;
type OrderStatus = "pending" | "paid" | "cancelled";

function formatOrderId(id: OrderId): string {
  // TODO: Kiểm tra typeof rồi xử lý.
  return "Chưa hoàn thành";
}

// TODO: Khai báo Order.
// TODO: Tạo đơn hàng và cập nhật status.

console.log(formatOrderId(12));       // ORDER-12
console.log(formatOrderId("web-12")); // WEB-12
```

**Yêu cầu bổ sung:** Không dùng `any` hoặc `as` để bỏ qua kiểm tra kiểu.

---

### Bài tập 5 — Intersection cho sản phẩm có tồn kho

**Kiến thức:** object type, intersection, readonly, optional.

Khai báo:

```typescript
type Product = {
  readonly id: number;
  name: string;
  price: number;
};

type Inventory = {
  quantity: number;
  warehouse?: string;
};

type StockProduct = Product & Inventory;
```

**Yêu cầu:**

1. Tạo `StockProduct` có tên `"Bàn phím"`, giá `350000`, số lượng `4`.
2. Viết hàm `getStockValue(product: StockProduct): number`.
3. Hàm trả về `price * quantity`.
4. In tên sản phẩm và tổng giá trị tồn kho.
5. In kho hàng, hoặc `"Chưa xác định"` nếu không có.
6. Thử bỏ `quantity` để quan sát lỗi rồi bổ sung lại.

**Kết quả mong đợi khi không khai báo warehouse:**

```text
Bàn phím
1400000
Chưa xác định
```

**Câu cần giải thích:** Vì sao `StockProduct` cần đáp ứng cả `Product` và `Inventory`?

---

## 8. Năm câu hỏi lý thuyết

### Câu 1

Interface và type alias giống nhau và khác nhau ở đâu?

Cách nào có thể trực tiếp đặt tên cho `number | string`?

### Câu 2

`email?: string` và `readonly id: number` có ý nghĩa gì?

`readonly` có tự làm toàn bộ object bất biến khi chạy không?

### Câu 3

`extends` khác declaration merging như thế nào?

Điều gì xảy ra nếu hai interface cùng tên khai báo một thuộc tính lần lượt là `number` và `string`?

### Câu 4

`A | B` khác `A & B` như thế nào?

Với hai kiểu dưới đây, kiểu `C` cần những thuộc tính nào?

```typescript
type A = {
  name: string;
};

type B = {
  age: number;
};

type C = A & B;
```

### Câu 5

Interface và type alias có tồn tại như đối tượng JavaScript khi chạy không?

Khai báo một biến theo interface có tự kiểm tra dữ liệu API hoặc xác nhận email hợp lệ không?

---

## 9. Đáp án lý thuyết gợi ý

<details>
<summary>Mở sau khi tự trả lời</summary>

### Đáp án câu 1

Cả hai đều có thể mô tả object và hàm.

Interface hỗ trợ `extends` và hợp nhất khai báo. Type alias đặt tên được cho nhiều dạng kiểu, bao gồm kiểu cơ bản, tuple và union.

Để đặt tên trực tiếp cho `number | string`, dùng:

```typescript
type ID = number | string;
```

### Đáp án câu 2

- `email?: string`: có thể bỏ qua thuộc tính email.
- `readonly id: number`: không được gán lại id thông qua kiểu đó.

`readonly` không tự đóng băng object lúc chạy và không tự khiến toàn bộ dữ liệu lồng bên trong trở thành chỉ đọc.

### Đáp án câu 3

`extends` tạo một interface mới dựa trên kiểu đã có.

Declaration merging gộp các khai báo cùng tên thành một interface.

Nếu cùng một thuộc tính dữ liệu được khai báo với kiểu `number` và `string`, TypeScript báo lỗi vì các khai báo không tương thích.

### Đáp án câu 4

- `A | B`: giá trị đáp ứng ít nhất một kiểu.
- `A & B`: giá trị đáp ứng đồng thời cả hai kiểu.

`C` cần cả `name: string` và `age: number`.

```typescript
const person: C = {
  name: "Bao",
  age: 20,
};
```

### Đáp án câu 5

Interface và type alias không tồn tại như đối tượng JavaScript khi chạy. Các khai báo kiểu được xóa khi biên dịch.

Chúng không tự xác thực dữ liệu API hoặc định dạng email. Muốn kiểm tra dữ liệu thực tế, cần viết logic xác thực khi chạy.

</details>

---

## 10. Checklist ôn tập

- [ ] Tôi tạo được object theo interface.
- [ ] Tôi biết xử lý thuộc tính tùy chọn.
- [ ] Tôi phân biệt được const và readonly.
- [ ] Tôi dùng được extends.
- [ ] Tôi hiểu declaration merging.
- [ ] Tôi tạo được object type bằng type alias.
- [ ] Tôi phân biệt được union và intersection.
- [ ] Tôi biết kết hợp interface với type.
- [ ] Tôi hiểu kiểu dữ liệu không tự xác thực dữ liệu runtime.
- [ ] Tôi hoàn thành 5 bài tập và trả lời 5 câu hỏi.