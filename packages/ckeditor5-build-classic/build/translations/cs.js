(function(d){	const l = d['cs'] = d['cs'] || {};	l.dictionary=Object.assign(		l.dictionary||{},		{"%0 of %1":"%0 z %1","Align center":"Zarovnat na střed","Align left":"Zarovnat vlevo","Align right":"Zarovnat vpravo",Bold:"Tučné","Bulleted List":"Odrážky",Cancel:"Zrušit","Centered image":"Obrázek zarovnaný na střed","Change image text alternative":"Změnit alternativní text obrázku",Column:"Sloupec","Decrease indent":"Zmenšit odsazení","Delete column":"Smazat sloupec","Delete row":"Smazat řádek",Downloadable:"Ke stažení","Dropdown toolbar":"Rozbalovací panel nástrojů","Edit link":"Upravit odkaz","Editor toolbar":"Panel nástrojů editoru","Enter image caption":"Zadejte popis obrázku","Full size image":"Obrázek v plné velikosti","Header column":"Sloupec záhlaví","Header row":"Řádek záhlaví","Image resize list":"","Image toolbar":"Panel nástrojů obrázku","image widget":"ovládací prvek obrázku","Increase indent":"Zvětšit odsazení","Insert column left":"Vložit sloupec vlevo","Insert column right":"Vložit sloupec vpravo","Insert image":"Vložit obrázek","Insert paragraph after block":"","Insert paragraph before block":"","Insert row above":"Vložit řádek před","Insert row below":"Vložit řádek pod","Insert table":"Vložit tabulku",Italic:"Kurzíva",Justify:"Zarovnat do bloku","Left aligned image":"Obrázek zarovnaný vlevo",Link:"Odkaz","Link URL":"URL odkazu","Merge cell down":"Sloučit s buňkou pod","Merge cell left":"Sloučit s buňkou vlevo","Merge cell right":"Sloučit s buňkou vpravo","Merge cell up":"Sloučit s buňkou nad","Merge cells":"Sloučit buňky",Next:"Další","Numbered List":"Číslování","Open in a new tab":"Otevřít v nové kartě","Open link in new tab":"Otevřít odkaz v nové kartě",Original:"",Previous:"Předchozí",Redo:"Znovu","Resize image":"","Resize image to %0":"","Resize image to the original size":"","Rich Text Editor":"Textový editor","Rich Text Editor, %0":"Textový editor, %0","Right aligned image":"Obrázek zarovnaný vpravo",Row:"Řádek",Save:"Uložit","Select all":"Vybrat vše","Select column":"Vybrat sloupec","Select row":"Vybrat řádek","Show more items":"Zobrazit další položky","Side image":"Postranní obrázek","Split cell horizontally":"Rozdělit buňky horizontálně","Split cell vertically":"Rozdělit buňky vertikálně",Strikethrough:"Přeškrtnuté",Subscript:"Dolní index",Superscript:"Horní index","Table toolbar":"Panel nástrojů tabulky","Text alignment":"Zarovnání textu","Text alignment toolbar":"Panel nástrojů zarovnání textu","Text alternative":"Alternativní text","This link has no URL":"Tento odkaz nemá žádnou URL",Underline:"Podtržené",Undo:"Zpět",Unlink:"Odstranit odkaz","Upload failed":"Nahrání selhalo","Upload in progress":"Probíhá nahrávání","Widget toolbar":"Panel nástrojů ovládacího prvku"}	);l.getPluralForm=function(n){return (n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;;};})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}));