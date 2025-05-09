
<div align="center">

# 🧮 Хеш-таблица и хеш-сет: как это работает?

</div>

<div align="center">

## 1. Что такое HashSet?

</div>

**HashSet** — структура данных, которая позволяет выполнять операцию `contains` (проверка наличия элемента) за `O(1)`, независимо от количества элементов.

> Пример:  
> Если в HashSet добавлено миллион элементов, проверка наличия `"123"` займет **одинаковое время** для 10 и 10⁶ элементов.

<div align="center">

## 2. Как устроен HashSet?

</div>

При создании HashSet:
- Создаётся внутренний массив фиксированного размера (например, на 5 элементов)
- Каждая ячейка массива называется **bucket** (бакет)

```text
Пример структуры:
[0] → bucket 0  
[1] → bucket 1  
[2] → bucket 2  
[3] → bucket 3  
[4] → bucket 4
```

<div align="center">

## 3. Добавление элемента

</div>

Этапы добавления `"Миша"`:
1. Вызывается метод `add("Миша")`
2. Хеш-функция преобразует строку в число (например, `hashCode("Миша") = 21`)
3. Вычисляется индекс: `21 % 5 = 1`
4. Элемент добавляется в **бакет 1**



<div align="center">

## 4. Коллизии

</div>

**Коллизия** — ситуация, когда разные элементы попадают в один бакет.

Решение:
- В каждом бакете хранится **список элементов** (массив/связный список)
- Новый элемент добавляется в конец списка



<div align="center">

## 5. Метод contains (поиск)

</div>

Алгоритм проверки наличия `"Рома"`:
1. Вычисляется `hashCode("Рома")`
2. Определяется индекс бакета
3. Поиск **только в цепочке этого бакета**



<div align="center">

## 6. Метод remove (удаление)

</div>

Удаление `"Толя"`:
1. Вычисление индекса бакета через хеш
2. Поиск элемента в цепочке бакета
3. Удаление элемента при обнаружении



<div align="center">

## 7. Расширение таблицы

</div>

При заполнении таблицы:
1. Создается новый массив **удвоенного размера**
2. Все элементы перехэшируются
3. Старый массив заменяется новым

**Цель**: 
- Уменьшение коллизий
- Сохранение скорости операций


<div align="center">

## 8. HashMap (HashTable)

</div>

**HashMap** хранит пары ключ-значение. Пример добавления `"Рома" → 23`:
1. Хешируется ключ `"Рома"`
2. Определяется индекс бакета
3. В бакет добавляется пара `["Рома", 23]`


<div align="center">

## 9. Получение значения

</div>

Алгоритм получения значения для ключа `"Толя"`:
1. Хеширование ключа
2. Поиск в цепочке бакета
3. Возврат значения (например, `28`)


<div align="center">

## 10. Важные вопросы (собеседования)

</div>

❓ **Если hashCode всегда возвращает одно число?**  
→ Все элементы в одном бакете → операции `O(n)`.

❓ **Если hashCode возвращает случайные числа?**  
→ Невозможно найти элемент → `contains` вернет `false`.

❓ **Если equals считает разные объекты равными?**  
→ Нарушение логики. Правила:
- Переопределять `hashCode` и `equals` вместе
- Равные по `equals` объекты → одинаковый `hashCode`


<div align="center">

## 11. Реализация на JavaScript

</div>

```javascript
class HashTable {
  constructor(size = 5) {
    this.size = size;
    this.buckets = Array.from({ length: size }, () => []);
  }

  _hash(key) {
    let hash = 0;
    for (let char of key) {
      hash += char.charCodeAt(0);
    }
    return hash % this.size;
  }

  set(key, value) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
  }

  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    for (let pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return undefined;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  delete(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

```

<div align="center">

## 12. Реализация на python

</div>

``` python
 class HashTable:
    def init(self, size):
        self.size = size
        self.table = [[] for _ in range(size)]

    def _hash(self, key):
        return hash(key) % self.size

    def insert(self, key, value):
        index = self._hash(key)
        for pair in self.table[index]:
            if pair[0] == key:
                pair[1] = value
                return
        self.table[index].append([key, value])

    def get(self, key):
        index = self._hash(key)
        for pair in self.table[index]:
            if pair[0] == key:
                return pair[1]
        return None

    def delete(self, key):
        index = self._hash(key)
        for i, pair in enumerate(self.table[index]):
            if pair[0] == key:
                del self.table[index][i]
                return
   ```             

<div align="center">

## 13. Заключение

</div>

- Хеш-таблицы — **эффективная структура данных** (`O(1)` для основных операций)
- Используются в:  
  → JavaScript: `Object`, `Map`  
  → Python: `dict`  
  → Java: `HashMap`, `HashSet`  
  → C++: `unordered_map`
- Ключевые элементы:  
  → Качественная хеш-функция  
  → Механизм разрешения коллизий  
  → Динамическое расширение таблицы
