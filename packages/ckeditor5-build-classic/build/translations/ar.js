(function(d){	const l = d['ar'] = d['ar'] || {};	l.dictionary=Object.assign(		l.dictionary||{},		{"%0 of %1":"","Align center":"محاذاة في المنتصف","Align left":"محاذاة لليسار","Align right":"محاذاة لليمين",Bold:"عريض","Bulleted List":"قائمة نقطية",Cancel:"إلغاء","Centered image":"صورة بالوسط","Change image text alternative":"غير النص البديل للصورة",Column:"عمود","Delete column":"حذف العمود","Delete row":"حذف الصف",Downloadable:"","Dropdown toolbar":"","Edit link":"تحرير الرابط","Editor toolbar":"","Enter image caption":"ادخل عنوان الصورة","Full size image":"صورة بحجم كامل","Header column":"عمود عنوان","Header row":"صف عنوان","Image resize list":"","Image toolbar":"","image widget":"عنصر الصورة","Insert column left":"","Insert column right":"","Insert image":"ادراج صورة","Insert row above":"ادراج صف قبل","Insert row below":"ادراج صف بعد","Insert table":"إدراج جدول",Italic:"مائل",Justify:"ضبط","Left aligned image":"صورة بمحاذاة لليسار",Link:"رابط","Link URL":"رابط عنوان","Merge cell down":"دمج الخلايا للأسفل","Merge cell left":"دمج الخلايا لليسار","Merge cell right":"دمج الخلايا لليمين","Merge cell up":"دمج الخلايا للأعلى","Merge cells":"دمج الخلايا",Next:"","Numbered List":"قائمة رقمية","Open in a new tab":"","Open link in new tab":"فتح الرابط في تبويب جديد",Original:"",Previous:"",Redo:"إعادة","Resize image":"","Resize image to %0":"","Resize image to the original size":"","Rich Text Editor":"معالج نصوص","Rich Text Editor, %0":"معالج نصوص، 0%","Right aligned image":"صورة بمحاذاة لليمين",Row:"صف",Save:"حفظ","Select column":"","Select row":"","Show more items":"","Side image":"صورة جانبية","Split cell horizontally":"فصل الخلايا بشكل افقي","Split cell vertically":"فصل الخلايا بشكل عمودي",Strikethrough:"يتوسطه خط",Subscript:"",Superscript:"","Table toolbar":"","Text alignment":"محاذاة النص","Text alignment toolbar":"","Text alternative":"النص البديل","This link has no URL":"لا يحتوي هذا الرابط على عنوان",Underline:"تحته خط",Undo:"تراجع",Unlink:"إلغاء الرابط","Upload failed":"فشل الرفع","Upload in progress":"جاري الرفع"}	);l.getPluralForm=function(n){return n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 && n%100<=99 ? 4 : 5;;};})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}));