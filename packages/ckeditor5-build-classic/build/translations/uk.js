(function(d){	const l = d['uk'] = d['uk'] || {};	l.dictionary=Object.assign(		l.dictionary||{},		{"%0 of %1":"%0 із %1","Align center":"По центру","Align left":"По лівому краю","Align right":"По правому краю",Bold:"Жирний","Bulleted List":"Маркерний список",Cancel:"Відміна","Centered image":"Зображення по центру","Change image text alternative":"Змінити текстову альтернативу зображення",Column:"Стовпець","Decrease indent":"Зменшити відступ","Delete column":"Видалити стовпець","Delete row":"Видалити рядок",Downloadable:"Завантажувальне","Dropdown toolbar":"Випадаюча панель інструментів","Edit link":"Редагувати посилання","Editor toolbar":"Панель інструментів редактора","Enter image caption":"Введіть підпис зображення","Full size image":"Повний розмір зображення","Header column":"Заголовок стовпця","Header row":"Заголовок рядка","Image resize list":"Перелік розмірів","Image toolbar":"Панелі інструментів зображення","image widget":"Віджет зображення","Increase indent":"Збільшити відступ","Insert column left":"Вставити стовпець зліва","Insert column right":"Вставити стовпець справа","Insert image":"Вставити зображення","Insert paragraph after block":"Додати абзац після блока","Insert paragraph before block":"Додати абзац перед блоком","Insert row above":"Вставити рядок знизу","Insert row below":"Вставити рядок зверху","Insert table":"Вставити таблицю",Italic:"Курсив",Justify:"По ширині","Left aligned image":"Зображення ліворуч",Link:"Посилання","Link URL":"URL посилання","Merge cell down":"Поєднати комірки внизу","Merge cell left":"Поєднати комірки ліворуч","Merge cell right":"Поєднати комірки праворуч","Merge cell up":"Поєднати комірки вгору","Merge cells":"Поєднати комірки",Next:"Наступний","Numbered List":"Нумерований список","Open in a new tab":"Вікрити у новій вкладці","Open link in new tab":"Відкрити посилання у новій вкладці",Original:"Оригінал",Previous:"Попередній",Redo:"Повтор","Resize image":"Розтягнути зображення","Resize image to %0":"Розтягнути зображення до %0","Resize image to the original size":"Розтягнути зображення до оригінального розміру","Rich Text Editor":"Розширений текстовий редактор","Rich Text Editor, %0":"Розширений текстовий редактор, %0","Right aligned image":"Зображення праворуч",Row:"Рядок",Save:"Зберегти","Select all":"Вибрати все","Select column":"Виберіть стовпчик","Select row":"Виберіть рядок","Show more items":"Показати більше","Side image":"Бокове зображення","Split cell horizontally":"Розділити комірки горизонтально","Split cell vertically":"Розділити комірки вертикально",Strikethrough:"Закреслений",Subscript:"Нижній індекс",Superscript:"Верхній індекс","Table toolbar":"Панель інструментів таблиці","Text alignment":"Вирівнювання тексту","Text alignment toolbar":"Панель інструментів вирівнювання тексту","Text alternative":"Текстова альтернатива","This link has no URL":"Це посилання не має URL",Underline:"Підкреслений",Undo:"Відміна",Unlink:"Видалити посилання","Upload failed":"Завантаження не вдалось","Upload in progress":"Виконується завантаження","Widget toolbar":"Панель інструментів віджетів"}	);l.getPluralForm=function(n){return (n % 1 == 0 && n % 10 == 1 && n % 100 != 11 ? 0 : n % 1 == 0 && n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 1 : n % 1 == 0 && (n % 10 ==0 || (n % 10 >=5 && n % 10 <=9) || (n % 100 >=11 && n % 100 <=14 )) ? 2: 3);;};})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}));