// ---------------------------------------------------------------------------------
// Разминка
// Определите интерфейс для пользователя
interface User {
    id: number;
    name: string;
    // Добавьте свойство email типа string
    email: string;
  }
  
  // Определите интерфейс для активности пользователя
  interface Activity {
    userId: number;
    activity: string;
    // Добавьте свойство timestamp типа Date
    timestamp: Date;
  }
  
  // Реализуйте функцию fetchData используя Generic. Функция должна возвращать Promise.
  async function fetchData<T>(url: string): Promise<T> {
    // Реализуйте получение данных с использованием fetch и возвращение их в формате json
    fetch(url)
      .then((response) => response.json)    
      .catch(() => console.error('не пришел ответ от серва'));
  }
  
  // Используйте Utility Types для создания Partial и Readonly версий User и Activity
  type PartialUser = Partial<User>// Заполните тип
  type ReadonlyActivity = Readonly<Activity>// Заполните тип
  
  //Типизируйте функцию. userId - число
  function getUserActivities(userId: number) {
    return fetchData(`/api/activities/${userId}`);
  }
  // Используйте ReturnType для создания типа возвращаемого значения функции getUserActivities
  type ActivitiesReturnType = ReturnType<typeof getUserActivities>;// Заполните тип
  
  // Используйте extends в условных типах для создания типа Permissions
  type AdminPermissions = { canBanUser: boolean };
  type BasicPermissions = { canEditProfile: boolean };
  // Заполните тип. Должен выявляться на основне некоторого дженерика и опредять, какой из пермишенов выдавать: Admin или Basic.
  type Permissions<T> = T extends 'admin' ? AdminPermissions : BasicPermissions;
  
  
  ///ЧАСТЬ 2.
  
  // Определите Type Alias для Union типа String или Number
  type StringOrNumber = string | number;// Заполните тип
  
  // Реализуйте функцию logMessage, которая принимает StringOrNumber и не возвращает значение (void)
  function logMessage(message: StringOrNumber): void {
    // Реализуйте вывод сообщения в консоль
    console.log(`${message}`);
  }
  
  // Реализуйте функцию throwError, которая никогда не возвращает управление (never)
  function throwError(errorMsg: string): never {
    // Бросьте исключение с errorMsg
    throw new Error(`${errorMsg}`); 
  }
  
  // Реализуйте Type Guard для проверки, является ли значение строкой
  function isString(value: StringOrNumber): value is string {
    // Верните результат проверки типа
    return typeof value === 'string';
  }
  
  // Реализуйте функцию assertIsNumber, которая использует asserts для утверждения типа number
  function assertIsNumber(value: any): asserts value is number {
    // Бросьте исключение, если значение не является числом
    if (typeof value !== "number") { 
        throw new Error(`${value} это не число`);  
    } 
  }
  
  // Завершите функцию processValue, используя isString и assertIsNumber
  function processValue(value: StringOrNumber) {
    // Реализуйте логику проверки и обработки значения
    if (isString(value)) {
        console.log(`String value: ${value.toUpperCase()}`);
      } else {
        assertIsNumber(value);
        console.log(`Number value: ${value.toFixed(2)}`);
      }
    }
  
  // Type Alias и Union
  type StringOrNumber = string | number;
  
  
  //сделайте  Type Guard для определения, является ли значение строкой
  function isString(value) {
    if(typeof value === 'string'){
        return true;
    } else {
        return false;
    }
  }
  
  // создайте asserts function на число.
  function assertIsNumber(value: any): asserts value is number {
    if (typeof value !== "number") { 
        throw new Error(`${value} это не число`);
    } 
  }
  
  // Использование Type Guard и Asserts
  function processValue(value: StringOrNumber) {
    if (isString(value)) {
      console.log(`String value: ${value.toUpperCase()}`);
    } else {
      assertIsNumber(value);
      console.log(`Number value: ${value.toFixed(2)}`);
    }
  }
  
  //---------------------------------------------------------------------------------
  
  
  
  //---------------------------------------------------------------------------------
  // Задание 2: Расширенное использование Generics
  // Цель: Создать универсальную функцию обработки данных, которая может работать с различными типами данных.
  
  // Определите Generic интерфейс Response с одним параметром типа T. Второй параметр status: number
  interface Response<T> {
    data: T;
    status: number;
  }
  
  // Реализуйте и типизируйте функцию, которая возвращает объект Response для переданных данных
  declare const createResponse:<Response> (data: any, status: Response['status']) => Response;
    // Реализуйте создание и возврат объекта Response

  
  // Используйте функцию createResponse для создания ответа с массивом чисел
  const numericResponse = createResponse([1,2,3,4,5], 404)// Заполните вызов функции
  
  // Используйте функцию createResponse для создания ответа с объектом пользователя (User)
  const userTest: User = { id: 1, name: "John Doe", email: "johndoe@example.com" };
  const userResponse = createResponse(userTest, 200); // Заполните вызов функции
  //---------------------------------------------------------------------------------
  
    
  //---------------------------------------------------------------------------------
  // Задание 3: Расширенное использование Generics
  // Цель: Разработать несколько функций для обработки и различения типов данных.
  
  // Определите тип данных для описания автомобиля 
  type Car = {
    readonly typeVeh: 'Car';
    company: string;
    model: string;
    year: number;
  };
  
  // Определите тип данных для описания велосипеда
  type Bike = {
    readonly typeVeh: 'Bike';
    company: string;
    type: 'road' | 'mountain';
  };
  
  // Создайте Type Guard для проверки, является ли объект автомобилем
  function isCar (vehicle: Car | Bike): vehicle is Car {
    return vehicle.typeVeh === 'Car';
  }
  
  
  // Используйте Type Guard в функции, которая печатает информацию о транспорте. Небольшая подсказка о том, какие параметры в себя может принимать isCar дана ниже.
  function printVehicleInfo(vehicle: Car | Bike) {
    if (isCar(vehicle)) {
      console.log(`Car: ${vehicle.company} ${vehicle.model} ${vehicle.year}`);
    } else {
      console.log(`Bike: ${vehicle.company} ${vehicle.type}`);
    }
  }
  //---------------------------------------------------------------------------------
    
  
  
  //---------------------------------------------------------------------------------  
  // Задание 4: Использование Utility Types для работы с интерфейсами
  // Цель: Модифицировать интерфейсы для специфических нужд без изменения оригинальных интерфейсов.
  
  // Определите интерфейс Employee
  interface Employee {
    id: number;
    name: string;
    department: string;
    email: string;
  }
  
  // Используйте Utility Type для создания типа, который делает все свойства Employee опциональными
  type PartialEmployee = Partial<Employee>// Заполните тип
  
  // Используйте Utility Type для создания типа, который делает все свойства Employee доступными только для чтения
  type ReadonlyEmployee = Readonly<Employee>// Заполните тип
  
  // Создайте функцию, которая принимает PartialEmployee и выводит информацию о сотруднике
  function printEmployeeInfo(employee: PartialEmployee) {
    // Реализуйте логику функции, обрабатывая случай отсутствующих свойств
    employee.id ? console.log(`${employee.id}`) : console.log('Нет айди')
    employee.name ? console.log(`${employee.name}`) : console.log('Нет имя')
    employee.department ? console.log(`${employee.department}`) : console.log('Нет департамента')
    employee.email ? console.log(`${employee.email}`) : console.log('Нет емейла')
  } 
  //---------------------------------------------------------------------------------
  
  
  
  
  //---------------------------------------------------------------------------------  
  //Задание 5: Работа с Indexed Access Types и Mapped Types
  //Цель: Создать утилиты для работы с объектами и их ключами.
  
  // Определите интерфейс для пользователя
  interface User {
    id: number;
    name: string;
    email: string;
    age: number;
  }
  
  // Используйте Indexed Access Types для получения типа поля name из User
  type UserNameType = User['name']// Заполните тип
  
  // Создайте Mapped Type, который преобразует все поля интерфейса User в boolean. Можно воспользовать конструкцией Key in keyof 
  type UserFieldsToBoolean<User> = {
    [P in keyof User]: boolean;
  }
  // Реализуйте функцию, которая принимает ключи интерфейса User и возвращает их типы
  function getUserFieldType(key: User[keyof User]) {
    // Верните тип ключа
    if (typeof key === 'string'){
      return 'string';
    } else {
      return 'number';
    }
  }
  
  // Используйте эту функцию для получения типа поля 'age' и 'name'
  const ageType = getUserFieldType('age');
  const nameType = getUserFieldType('name');
  //---------------------------------------------------------------------------------
  
  
  
  
  
  
  //---------------------------------------------------------------------------------
  // Задание 6: Расширение и ограничение Generics
  // Цель: Создать универсальные функции с ограничениями типов.
  
  // Создайте базовый интерфейс для сущностей с идентификатором
  interface Identifiable {
    id: number;
  }

  interface User extends Identifiable {
    name: string,
    email: string,
    age: number
  }
  
  // Типизируйте функцию, которая принимает массив объектов с ограничением на Generics, где каждый объект должен соответствовать интерфейсу Identifiable. Не забывайте, что find может вернуть undefined
  function findById<T extends Identifiable>(items:T[], id: T['id'] ): T | undefined {
    return items.find(item => item.id === id);
  }
  
  // Используйте эту функцию для поиска пользователя по id в массиве пользователей
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 30 }
  ];
  const user = findById(users, 1);
  //---------------------------------------------------------------------------------
  
  
  
  
  
  
  //---------------------------------------------------------------------------------
  // Задание 7: Работа с обобщённой функцией поиска в массиве
  // Цель: Создать функцию, которая может искать элементы в массиве по разным критериям, включая составные типы и условия с использованием нескольких параметров в Generics.
  interface User {
    id: number;
    name: string;
    age: number;
  }
  
  interface Product {
    id: number;
    name: string;
    price: number;
  }
  
  interface Book {
    isbn: string;
    title: string;
    author: string;
  }
  
  // Разберитесь с типизацией функции и поймите как она работает.
  // Как можно улучшить функцию findInArray, чтобы она обрабатывала случаи, когда ключ или значение отсутствуют?
  // Можно ли использовать эту функцию для поиска по нескольким ключам одновременно? Если да, как бы вы это реализовали?
  function findInArray<T, K extends keyof T>(items: T[], keys: K[], values: T[K][]): T | undefined {
    return items.find(item => keys.every((key, index) => item[key] !== undefined && item[key] === values[index]));
  }
  // Данные для тестирования функции
  const users: User[] = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 }
  ];
  
  const products: Product[] = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Smartphone", price: 500 }
  ];
  
  const books: Book[] = [
    { isbn: "12345", title: "The TypeScript Handbook", author: "Someone" },
    { isbn: "67890", title: "Learning TypeScript", author: "Another One" }
  ];
  
  // 1. Найдите пользователя по имени "Alice".
  const foundUser = findInArray(users, ['name'], ["Alice"]);
  // 2. Найдите продукт с ценой 500.
  const foundProduct = findInArray(products, ['price'], [500]);
  // 3. Найдите книгу по автору "Another One".
  const foundBook = findInArray(books, ['author'], ["Another One"]);;
  //---------------------------------------------------------------------------------
  
  
  
  
  
  
  //---------------------------------------------------------------------------------
  // Задание 8: Реализация обобщённой функции для сопоставления и преобразования элементов массива
  // Цель: Создать функцию mapAndFilter, которая будет принимать массив объектов, функцию для их преобразования и функцию для фильтрации результатов. Функция должна использовать два параметра Generic: один для типа элементов входного массива, а другой для типа элементов выходного массива.
  
  // Описание задачи: Функция mapAndFilter должна выполнить следующие функции:
  // Применить функцию преобразования ко всем элементам входного массива.
  // Фильтровать преобразованные элементы с помощью предоставленной функции фильтрации.
  // Возвращать новый массив с результатами, которые прошли фильтрацию.
  interface Person {
    name: string;
    age: number;
  }
  
  interface Adult {
    fullName: string;
    age: number;
  }
  
  // Напишите функцию mapAndFilter здесь. Используйте два параметра Generic: T для типа входных данных и U для типа выходных данных.
  function mapAndFilter<T,U>(items: T[], transform: (item: T) => U, filter: (item: U) => boolean): U[] {
    // Ваш код здесь
    const filteredArray = items.map(item => transform(item)).filter(item => filter(item))
    return filteredArray;
  }
  
  // Пример данных
  const people: Person[] = [
    { name: "Alice", age: 24 },
    { name: "Bob", age: 17 },
    { name: "Charlie", age: 32 }
  ];
  
  // Пример использования функции mapAndFilter
  const adults: Adult[] = mapAndFilter(
    people,
    (person) => ({ fullName: person.name, age: person.age }),
    (adult) => adult.age >= 18
  );
  
  // Выведите результаты для проверки
  console.log(adults);
  
  
  //Вопросы после реализации:
  // Как изменится функция, если необходимо добавить возможность изменения критерия сортировки?

  //Добавить опциональный параметр сортировки в функцию 

  // Могут ли типы T и U быть полностью разными или должны иметь общие характеристики? Объясните ваш ответ.

  //Да, так как функция mapAndFilter принимает любые два типа, но стоит учесть, что при передачи количество ключей T с U 
  //может не совпадать и стоит сделать ключи типа U опциональными
  
  
  //---------------------------------------------------------------------------------
  