(function(d){	const l = d['pl'] = d['pl'] || {};	l.dictionary=Object.assign(		l.dictionary||{},		{"%0 of %1":"%0 z %1","Align center":"Wyrównaj do środka","Align left":"Wyrównaj do lewej","Align right":"Wyrównaj do prawej",Bold:"Pogrubienie","Bulleted List":"Lista wypunktowana",Cancel:"Anuluj","Change image text alternative":"Zmień tekst zastępczy obrazka",Column:"Kolumna","Decrease indent":"Zmniejsz wcięcie","Delete column":"Usuń kolumnę","Delete row":"Usuń wiersz",Downloadable:"Do pobrania","Dropdown toolbar":"Rozwijany pasek narzędzi","Edit link":"Edytuj odnośnik","Editor toolbar":"Pasek narzędzi edytora","Header column":"Kolumna nagłówka","Header row":"Wiersz nagłówka","Image resize list":"","image widget":"Obraz","Increase indent":"Zwiększ wcięcie","Insert column left":"Wstaw kolumnę z lewej","Insert column right":"Wstaw kolumnę z prawej","Insert image":"Wstaw obraz","Insert paragraph after block":"Wstaw akapit po bloku","Insert paragraph before block":"Wstaw akapit przed blokiem","Insert row above":"Wstaw wiersz ponad","Insert row below":"Wstaw wiersz poniżej","Insert table":"Wstaw tabelę",Italic:"Kursywa",Justify:"Wyrównaj obustronnie",Link:"Wstaw odnośnik","Link URL":"Adres URL","Merge cell down":"Scal komórkę w dół","Merge cell left":"Scal komórkę w lewo","Merge cell right":"Scal komórkę w prawo","Merge cell up":"Scal komórkę w górę","Merge cells":"Scal komórki",Next:"Następny","Numbered List":"Lista numerowana","Open in a new tab":"Otwórz w nowej zakładce","Open link in new tab":"Otwórz odnośnik w nowej zakładce",Original:"",Previous:"Poprzedni",Redo:"Ponów","Resize image":"","Resize image to %0":"","Resize image to the original size":"","Rich Text Editor":"Edytor tekstu sformatowanego","Rich Text Editor, %0":"Edytor tekstu sformatowanego, %0",Row:"Wiersz",Save:"Zapisz","Select all":"Zaznacz wszystko","Select column":"Zaznacz kolumnę","Select row":"Zaznacz wiersz","Show more items":"Pokaż więcej","Split cell horizontally":"Podziel komórkę poziomo","Split cell vertically":"Podziel komórkę pionowo",Strikethrough:"Przekreślenie",Subscript:"Indeks dolny",Superscript:"Indeks górny","Table toolbar":"Pasek narzędzi tabel","Text alignment":"Wyrównanie tekstu","Text alignment toolbar":"Pasek narzędzi wyrównania tekstu","Text alternative":"Tekst zastępczy obrazka","This link has no URL":"Nie podano adresu URL odnośnika",Underline:"Podkreślenie",Undo:"Cofnij",Unlink:"Usuń odnośnik","Upload failed":"Przesyłanie obrazu nie powiodło się","Upload in progress":"Trwa przesyłanie","Widget toolbar":"Pasek widgetów"}	);l.getPluralForm=function(n){return (n==1 ? 0 : (n%10>=2 && n%10<=4) && (n%100<12 || n%100>14) ? 1 : n!=1 && (n%10>=0 && n%10<=1) || (n%10>=5 && n%10<=9) || (n%100>=12 && n%100<=14) ? 2 : 3);;};})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}));