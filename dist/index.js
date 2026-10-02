"use strict";
/*
    Bài 3: function và generics
    3. function và generics
    3.1. function trong typeScript
    - typeScript mở rộng javaScript bằng cách thêm khả năng
    định nghĩa kiểu cho hàm, giúp kiểm soát chặt chẽ, hơn
    các tham số và giá trị trả về
    - Tham số tùy chọn: Dùng ? để chỉ định tham số không
    bắt buộc
    - Hàm không trả về giá trị dùng kiểu void cho các
    hàm không có giá trị trả về
    - Hàm trả về never: Kiểu never được sử dụng khi hàm
    không bao giờ kết thức( như ném lỗi hoặc vòng lặp vô hạn)
    - Định nghĩa kiểu cho hàm bằng interface hoặc type alias
    3.2. generics trong typeScript
    - generics cho phép định nghĩa hàm interface hoặc class có thể
    hoạt động với nhiều kiểu dữ liệu khác nhau mà vẫn
    đảm bảo tính an toàn kiểu(type safety)
    - Hàm generics: generics trong hàm thường được sử dụng
    để giữ kiểu của tham số và giá trị trả về
    + <T>: là một placeholder cho kiểu dữ liệu sẽ được
    truyền vào
    + Kiểu dữ liệu được xác định khi hàm được gọi là
    number hoặc string

    type MathOperation = (a: number, b: number) => number;
    const subtract: MathOperation = (a, b) => a - b;
    console.log(subtract(10, 5));

    function identity<T>(value: T): T {
    return value;
    }
    console.log(identity<number>(10));
    console.log(identity<string>("Hello"));
    - generics với nhiều tham số
    - Giới hạn kiểu generics
    - generics trong interface
    - generics trong class
    - generics trong type alias
    - Tóm tắt sự khác biệt functions và generics
    + Mục đích:
    function: Định nghĩa logic xử lý với kiểu dữ liệu cụ thể
    hoặc cố định.
    generics: xây dựng các logic có thể áp dụng cho nhiều kiểu
    dữ liệu khác nhau
    + Tính linh hoạt:
    function: ít linh hoạt hơn(phải định nghĩa cụ thể Kiểu
    cho tham số và giá trị trả về)
    generics: linh hoạt hơn vì có thể áp dụng cho nhiều
    kiểu mà vẫn đảm bảo an toàn Kiểu
    + Ứng dụng phổ biến:
    function: Xử lý dữ liệu hoặc tính toán cụ thể
    generics:xây dựng cấu trúc dữ liệu, hàm hoặc class
    tái sử dụng với nhiều kiểu dữ liệu khác

    4. Class và modules
    4.1. Classes trong typeScript
    class(lớp) trong OOP là các template hay cấu trúc để
    để phục vụ cho việc xây dựng nên các object(đối tượng)
    Trong đó sẽ bao gồm tập hợp các attribute và methods để
    xác định nghĩa các đặc tính của hành vi cho các object
    - attributes: Định nghĩa các thông tin, dặc điểm cũng như
    các thuộc tính của object
    - methods: định nghĩa các hành vi, phương thức cũng
    như các hành động thường có của object.
    Ví dụ: ta có class person với các attributes là: Họ
    tên, tuổi tác, nghề nghiệp và các methods là: ăn, ngủ
    đi làm
    - contructor: Phương thức đặc biệt để khởi tạo đối tượng
    - Phương thức: là các hàm được định nghĩa bên trong lớp
    1. Bao đóng, modifiers(public, private, protected)
    - public:
    + Phạm vi: Mọi nơi trong chương trình
    + Mô tả:
        Các thuộc tính hoặc phương thức được khai báo với
        public có thể được truy cập từ bên trong hoặc
        bên ngoài lớp
        Đây là phạm vi truy cập rộng nhất.
    2. Kế thừa, hàm super gọi cha để dùng
    3.
    4.
    */
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`);
    }
    //setter
    setAge(newAge) {
        this.age = newAge;
    }
    //getter
    getAge() {
        return this.age;
    }
}
const alice = new Person("Bao", 20);
alice.setAge(40);
console.log(alice.getAge());
