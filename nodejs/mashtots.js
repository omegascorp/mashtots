/*
 *  Mashtots 2.0.5
 */
var vowel = 'ԱԵԷԸԻՈՕաեիէըոօ';
var sonant = 'ԲԳԴԶԹԺԼԽԾԿՀՁՂՃՄՅՆՇՉՊՋՌՍՎՏՐՑՓՔՖբգդզթժլխծկհձղճմյնշչպջռսվտրցփքֆ';
var alphabet = 'ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔևՕՖաբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆ';
var alphabetWithoutH = 'ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔևՕՖաբգդեզէըթժիլխծկձղճմյնշոչպջռսվտրցւփքօֆ';
var alphabetWithoutAOJ = 'ԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՆՇՉՊՋՌՍՎՏՐՑՒՓՔևՕՖբգդեզէըթժիլխծկհձղճմնշչպջռսվտրցւփքօֆ';
var endOfWord = '[^' + alphabet + '՞՜]|$';
var beginningOfWord = '[^' + alphabet + ']|^';
var data = [
    // Բառմիջում և բառավերջում ա, ե, ի ձայնավորներից հետո վ լսվելիս գրվում է ւ  // սա իրա մեջ ներառում է //  բառավերջում կամ ձայնավորից առաջ    իվ -> իւ
    [
        '([աեիԱԵԻ])վ',
        '$1ւ',
        '([աեիԱԵԻ])ւ',
        '$1վ'
    ],
    //  և - եւ
    [
        'և',
        'եւ',
        'եւ',
        'և'
    ],
    // բաղաձայնից առաջ    յու -> իւ
    [
        '([^' + vowel + ']|' + beginningOfWord + ')յու([' + sonant + '])',
        '$1իւ$2',
        '([^' + vowel + ']|' + beginningOfWord+')իւ([' + sonant + '])', 
        '$1յու$2'
    ],
    // TODO:
    // ո -ից հետո վ -> ւ չի դառնում
    //
    // բարդ բառերում եթե երկրորդ բառը սկսվում է վ տառով, ապա վ մնում է, 
    // օր․ ՝  պատմավէպ, կարեվէր, անվերջ
    // այս կետը բաց է մնում
    //
    //  ա,ե,է,ի,ո  ձայնավորներից առաջ, բաղաձայնից և յ կիսաձայնից հետո  վ -> ու
    [
        '([' + sonant + 'յ])վ([աեէիո])',
        '$1ու$2',
        '([' + sonant + 'յ])ու([աեէիո])',
        '$1վ$2'
    ],
    // բառավերջի ե -> է
    [
        '([' + alphabet + '])ե(' + endOfWord + ')',
        '$1է$2',
        '([' + alphabet + '])է(' + endOfWord + ')',
        '$1ե$2'
    ],
    // ույ -> ոյ    բոլոր իմ տեսած օրինակներում ույ-գտնվում է բաղաձայների մեջ, ինչպես նաև խուսափում ենք այնպիսի ոյան ազգանունների փոփոխելուց
    [
        '([' + sonant + '])ույ([' + sonant +'])',
        '$1ոյ$2',
        '([' + sonant + '])ոյ([' + sonant + '])',
        '$1ույ$2'
    ],
    // յա -> եա  /բայց ոչ բառասկզբում և ոչ ա,ո-ից հետո + յ տառից հետո
    [
        '([' + alphabetWithoutAOJ + '])յա',
        '$1եա',
        '([' + alphabetWithoutAOJ + '])եա',
        '$1յա'
    ],
    // յո -> եօ
    [
        'յո([^ւ])',
        'եօ$1',
        'եօ',
        'յո'
    ],
    // յո -> եօ
    [
        'Յո([^ւ])',
        'Եօ$1',
        'Եօ',
        'Յո'
    ],
    // բառասկզբում յ գրելու համար օրենք չկա պետք է հիշել այդ բառերը
    [
        'հ(ագե|ախճապակ|ախուռն|ածանա|ակինթ|աղթ|աճախ|ամառ|ամր|այտ|անդիման|անդուգն|անկարծ|անկերգ|անձ|անցագործ|անցանք|ապաղ|ապավ|ապաւ|աջող|աջորդ|առ|ասմիկ|ասպիս|ավերժ|ատակ|ատկ|ատուկ|արաբ|արազ|արգ|արդա|արձ|արմ|արութ|աւակ|աւել|աւելեալ|աւետ|աւէտ|աւիտ|ափշտակ|եղա|են|եսան|ետա|երյուրանք|իմար|իշ|իսն|իսուն|իրավի|ղ|ոբել|ոգն|ոդ|ոժար|ոխորտալ|ողդողդ|ոյզ|ոյժ|ոյս|ոնք|ոշոտ|ոպոպ|ոռի|ովազ|ովատակ|ովսե|որանջ|որդ|որդոր|որին|որձ|որջորջել|ուզ|ուլիս|ուղարկ|ույն|ույս|ունապ|ունիս|ունուար|ուշ|ուռթի|ուռութ|ուսա|ստակագեն)',
        'յ$1',
        'յ(ագե|ախճապակ|ախուռն|ածանա|ակինթ|աղթ|աճախ|ամառ|ամր|այտ|անդիման|անդուգն|անկարծ|անկերգ|անձ|անցագործ|անցանք|ապաղ|ապավ|ապաւ|աջող|աջորդ|առ|ասմիկ|ասպիս|ավերժ|ատակ|ատկ|ատուկ|արաբ|արազ|արգ|արդա|արձ|արմ|արութ|աւակ|աւել|աւելեալ|աւետ|աւէտ|աւիտ|ափշտակ|եղա|են|եսան|ետա|երյուրանք|իմար|իշ|իսն|իսուն|իրավի|ղ|ոբել|ոգն|ոդ|ոժար|ոխորտալ|ողդողդ|ոյզ|ոյժ|ոյս|ոնք|ոշոտ|ոպոպ|ոռի|ովազ|ովատակ|ովսե|որանջ|որդ|որդոր|որին|որձ|որջորջել|ուզ|ուլիս|ուղարկ|ույն|ույս|ունապ|ունիս|ունուար|ուշ|ուռթի|ուռութ|ուսա|ստակագեն)',
        'հ$1'
    ],
    // բառասկզբում յ գրելու համար օրենք չկա պետք է հիշել այդ բառերը
    [
        'Հ(ագե|ախճապակ|ախուռն|ածանա|ակինթ|աղթ|աճախ|ամառ|ամր|այտ|անդիման|անդուգն|անկարծ|անկերգ|անձ|անցագործ|անցանք|ապաղ|ապավ|ապաւ|աջող|աջորդ|առ|ասմիկ|ասպիս|ավերժ|ատակ|ատկ|ատուկ|արաբ|արազ|արգ|արդա|արձ|արմ|արութ|աւակ|աւել|աւելեալ|աւետ|աւէտ|աւիտ|ափշտակ|եղա|են|եսան|ետա|երյուրանք|իմար|իշ|իսն|իսուն|իրավի|ղ|ոբել|ոգն|ոդ|ոժար|ոխորտալ|ողդողդ|ոյզ|ոյժ|ոյս|ոնք|ոշոտ|ոպոպ|ոռի|ովազ|ովատակ|ովսե|որանջ|որդ|որդոր|որին|որձ|որջորջել|ուզ|ուլիս|ուղարկ|ույն|ույս|ունապ|ունիս|ունուար|ուշ|ուռթի|ուռութ|ուսա|ստակագեն)',
        'Յ$1',
        'Յ(ագե|ախճապակ|ախուռն|ածանա|ակինթ|աղթ|աճախ|ամառ|ամր|այտ|անդիման|անդուգն|անկարծ|անկերգ|անձ|անցագործ|անցանք|ապաղ|ապավ|ապաւ|աջող|աջորդ|առ|ասմիկ|ասպիս|ավերժ|ատակ|ատկ|ատուկ|արաբ|արազ|արգ|արդա|արձ|արմ|արութ|աւակ|աւել|աւելեալ|աւետ|աւէտ|աւիտ|ափշտակ|եղա|են|եսան|ետա|երյուրանք|իմար|իշ|իսն|իսուն|իրավի|ղ|ոբել|ոգն|ոդ|ոժար|ոխորտալ|ողդողդ|ոյզ|ոյժ|ոյս|ոնք|ոշոտ|ոպոպ|ոռի|ովազ|ովատակ|ովսե|որանջ|որդ|որդոր|որին|որձ|որջորջել|ուզ|ուլիս|ուղարկ|ույն|ույս|ունապ|ունիս|ունուար|ուշ|ուռթի|ուռութ|ուսա|ստակագեն)',
        'Հ$1'
    ],
    // բառավերջում ա -ից հետո դրվում է չկարդացվող յ, բացառություն են կազմում սա դա նա սրա դրա նրա, alphabetWithoutH-ով բացառում ենք հայ-ի դեպքը
    [
        '([' + alphabet + '][' + alphabetWithoutH + '])ա(' + endOfWord + ')',
        '$1այ$2',
        '([' + alphabet + '][' + alphabetWithoutH + '])այ('+ endOfWord +')',
        '$1ա$2'
    ],
    // բառավերջում ո -ից հետո դրվում է չկարդացվող յ  // սա առանձնացվել է հատուկ հայ բառի պատճառով
    [
        '([' + alphabet + '])ո(' + endOfWord + ')',
        '$1ոյ$2',
        '([' + alphabet + '])ոյ(' + endOfWord + ')',
        '$1ո$2'
    ],
    // բառավերջի  են ->  Էն
    [
        '([' + alphabet + '])են(' + endOfWord + ')',
        '$1էն$2',
        '([' + alphabet + '])էն(' + endOfWord + ')',
        '$1են$2'
    ],
    // բառավերջի  եի ->  Էի
    [
        '([' + alphabet + '])եի(' + endOfWord + ')',
        '$1էի$2',
        '([' + alphabet + '])էի(' + endOfWord + ')',
        '$1եի$2'
    ]
    /*
    //բառավերջի  ոն ->  օն
    [
        '([' + alphabet + '])ոն($)',
        '$1օն$2',
        '([' + alphabet + '])օն($)',
        '$1ոն$2'
    ]
    */
];
// սխալների ուղղում կամ բացառություններ
var errorCorrectionSovietToMashtots = [
    ['սրայ', 'սրա'], ['Սրայ', 'Սրա'], ['դրայ', 'դրա'], ['Դրայ', 'Դրա'],
    ['նրայ', 'նրա'], ['Նրայ', 'Նրա'], ['հիմայ', 'հիմա'], ['Հիմայ', 'Հիմա'],
    ['ապայ', 'ապա'], ['Ապայ', 'Ապա'], ['նրայ', 'նրա'], ['Նրայ', 'Նրա'],
    ['ահայ', 'ահա'], ['Ահայ', 'Ահա'], ['այոյ', 'այո'], ['Այոյ', 'Այո'],
    ['աղայ', 'աղա'], ['Աղայ', 'Աղա'], ['փաշայ', 'փաշա'], ['Փաշայ', 'Փաշա'],
    ['ամիրայ', 'ամիրա'], ['Ամիրայ', 'Ամիրա'], ['կակաոյ', 'կակաո'], ['Կակաոյ', 'Կակաո'],
    ['այոյ', 'այո'], ['Այոյ', 'Այո'],
    ['Փօքր', 'Փոքր'], ['կօնք', 'կոնք'], ['Կօնք', 'Կոնք'],
    ['Վու', 'Ւու'], ['ուու', 'ւու'], ['Ուու', 'Ւու'],
    ['էւ', 'եւ'], ['Էւ', 'Եւ'], ['քոյ', 'քո'], ['Քոյ', 'Քո'],
    ['կա', 'կայ'], ['Կա', 'Կայ'], ['գա', 'գայ'], ['Գա', 'Գայ'],
    ['գեր', 'գէր'], ['Գեր', 'Գէր'], ['մնայ', 'մնա'],
    ['այեղագոռ', 'ահեղագոռ'],['գէտնաթաղ', 'գետնաթաղ'],['փետ', 'փէտ'],
    ['քանակապէս','քանակապես'],['օք','ոք'],['որբեվայրի','որբեւայրի']
];
var errorCorrectionSovietToMashtotsInTheWord = [
    ['ակադէմ', 'ակադեմ'],
    ['փօքր', 'փոքր'], ['վու', 'ւու'], ['աւէտ', 'աւետ'], ['նուէր', 'նուեր'],
    ['յաւետ', 'յաւէտ'], ['գմբեթ', 'գմբէթ'], ['մեկ', 'մէկ'],
    ['թեպետ', 'թէպէտ'], ['Աբել', 'Աբէլ'],
    ['ուու', 'ւու'], ['սէրնդ', 'սերնդ'], ['սէրունդ', 'սերունդ'],  ['ղեկաւար', 'ղեկավար'],
    ['Աւէտիք', 'Աւետիք'], ['Հակոբ', 'Յակոբ'],  ['ազգէր', 'ազգեր'],  ['ակտիւորէն', 'ակտիւօրէն'],
    ['ամենաւ', 'ամենավ'], ['ամենուր', 'ամէնուր'], ['սէրել', 'սերել'], ['սէրվ', 'սերվ'],
    ['անուերջ', 'անվերջ'], ['ւարձ', 'վարձ'], ['տոմսէր', 'տոմսեր'], ['եութիւն', 'էութիւն'],
    ['եղբոր', 'եղբօր'], ['երեկ', 'երէկ'],  ['կէնդ', 'կենդ'],
    ['աեօվ', 'այով'], ['իդեալ', 'իդէալ'], ['կէնս', 'կենս'],
    ['իրէն', 'իրեն'], ['կէնտ', 'կենտ'], ['ոյան', 'ոյեան'], ['կէնս', 'կենս'], ['իրէն', 'իրեն'],
    ['խօստ', 'խոստ'], ['ծափայար', 'ծափահար'],
    ['յարաւ', 'հարաւ'], ['յարբ', 'հարբ'], ['յարիր', 'հարիր'], ['յարկ', 'հարկ'], ['յարիւր', 'հարիւր'],
    ['յարց', 'հարց'], ['յենց', 'հենց'], ['յոդուած', 'յօդուած'],
    ['հօրդոր', 'յորդոր'], ['([^ո])ւառ', '$1վառ'], ['հրեշ', 'հրէշ'],
    ['մայար', 'մահար'], ['ւայր', 'վայր'], ['որօնք', 'որոնք'], ['(' + beginningOfWord + ')ցող', '$1ցօղ'],
    ['պատայար', 'պատահար'], ['պոեմ', 'պօէմ'], ['հետո', 'յետո'],
    ['երէկո', 'երեկո'], ['հոլովակ', 'յոլովակ'],
    ['սկավառ', 'սկաւառ'], ['մէկն', 'մեկն'], ['մեքէնա', 'մեքենա'],['տերև', 'տերեւ'],
    ['րոպե', 'րոպէ'],['հրեա', 'հրէա'],
    ['շատէր', 'շատեր'], ['պատէր', 'պատեր'], ['կնուիրուէն', 'կնուիրուեն'],
    ['([' + alphabet + '])յարութ', '$1հարութ'],
    ['ւստահ', 'վստահ'], ['ուախճան', 'վախճան'], ['ատօք', 'ատոք'],
    ['գավառ', 'գաւառ'], ['ւճար', 'վճար'], ['ւաճառ', 'վաճառ'],
    ['([^ո])ւար(ութիւն|ման)', '$1վար$2'], ['դէմիրճեան', 'դեմիրճեան'], ['եդէմ', 'եդեմ'],
    ['ժողւուրդ', 'ժողովուրդ'], ['ինտէ', 'ինտե'], ['ւիճակ', 'վիճակ'], ['լամլամօրել', 'լամլամորել'],
    ['խռւ', 'խռով'], ['ւիժ', 'վիժ'], ['դրօշմ', 'դրոշմ'], ['կառլէն', 'կառլեն'], ['մօրթ', 'մորթ'],
    ['կդադար', 'կը-դադար'], ['կինո([^ւ])', 'կինօ$1'],['ուզէնք', 'ուզենք'],
    ['համւ', 'համով'],['հաշւէ', 'հաշուե'],['յարմոն', 'հարմոն'],
    ['('+beginningOfWord+')հարատ', '$1յարատ'],['('+beginningOfWord+')հօնք', '$1յօնք'],
    ['հէգն', 'հեգն'],['հոգսէր', 'հոգսեր'],['հւուեր', 'հովուեր'],
    ['հրէշտակ', 'հրեշտակ'],['զգէստ', 'զգեստ'],['մէտաքս', 'մետաքս'],
    ['ւարս', 'վարս'],['մտէրմ', 'մտերմ'],['յետամուտ', 'հետամուտ'],['նուիրատւութ','նուիրատուութ'],
    ['շմօր', 'շմոր'],['շոգէ', 'շոգե'],['շոեօղ', 'շոյող'],['ոգէշնչ', 'ոգեշնչ'],
    ['րօրակ', 'րորակ'], ['պատուեր', 'պատուէր'], ['սավառն', 'սաւառն'],
    ['ւարժակ', 'վարժակ'], ['սէրմ', 'սերմ'],['([^խ])որէն', '$1օրէն'],['սէրտ', 'սերտ'],
    ['սոսնձու(մ|կ)', 'սօսնձու$1'], ['մօտոր', 'մոտոր'],['օրթոդօքս','օրթոդոքս'],['չարէնց','չարենց'],
    ['չէզօք','չէզոք'],['ունէն','ունեն'],['չօք','չոք'],['համառոտ', 'համառօտ'],['ւիպ', 'վիպ'],
    ['պարգեւատւ', 'պարգեւատու'],['պարկէտ', 'պարկետ'],['ուարչութ', 'վարչութ'],['պէտքաղ', 'պետքաղ'],
    ['պլեբեեա', 'պլեբէյա'],['պլեբեյ', 'պլեբէյ'],['իւեր', 'իվեր'],['դիվեր', 'դիւեր'],['ունիվերս', 'ունդիւերս'],
    ['ուէժ', 'վէժ'],['ցողել', 'ցօղել'],['ռեակտ', 'ռէակտ'],['էրէն', 'երէն'],['սաժէն', 'սաժեն'],
    ['սէրակեր', 'սերակեր'],['սէրգեյ', 'սերգեյ'],['սէրժ', 'սերժ'],['սէրհատ', 'սերհատ'],
    ['սէրում', 'սերում'],['սթիւէն', 'սթիւեն'], ['ահօտ', 'ահոտ'],['սկէս','սկես'],['սուէտ','սովետ'],
    ['սովօրէ','սովորե'],['ուսէր','ուսեր'],['ստամօքս','ստամոքս'],['ւայել','վայել'],['օրդ','որդ'],
    ['վաշինգտօն', 'վաշինգտոն'],['ւազք', 'վազք'],['էնի','ենի'],['վեյանձ','վեհանձ'],
    ['վերասէր', 'վերասեր'],['վյատակ','վհատակ'],['ւուշա','վուշա'],['վրդւ','վրդով'],
    ['էրորդ','երորդ'],['ւախութիւն','վախութիւն'],['ւերջ','վերջ'],['տարօրոշ','տարորոշ'],
    ['տեղեկատւու','տեղեկատուու'],['տէրեւ', 'տերեւ'],['աւարդ', 'ավարդ'],['տէրիտորիա', 'տերիտորիա'],
    ['տեւտօն', 'տեւտոն'],['սուար', 'սվար'],['լեօզ', 'լյոզ'],['տրիտօն', 'տրիտոն'],['յառաչ', 'հառաչ'],
    ['ցրտաւար','ցրտավար'],['ուանկ','վանկ'],['(հաշ|ուր)վանկ', '$1ուանկ'],['փետ(անալ|ացնել)', 'փէտ$1'],
    ['աւարական','ավարական'],['ուարական','վարական'],['րւութիւն','րովութիւն'],['քուեա','քուէա'],
    ['('+beginningOfWord+'|հանրա)քուեն','$1քուէն'],['քրեա','քրէա'],['քրիստօ','քրիստո'],
    ['ֆեստօն','ֆէստոն'],['ֆեստիւալ','ֆէստիվալ'],['մէտր','մետր'],['բորբօք','բորբոք'],
    ['('+beginningOfWord+')որդէ','$1որդե'],['ոսկեցող','ոսկեցօղ'],['ոսկէ(['+alphabet+'])','ոսկե$1'],
    ['ուէմ','ուեմ'],['ողօք','ողոք'],['ոլօք','ոլոք'],['ոգէթափանց','ոգեթափանց'],
    ['('+beginningOfWord+')կ(լին|հաղորդ|մնա|վնաս)', '$1կը-$2'],
    ['('+beginningOfWord+')կ(ուզեն|ունե)', '$1կ\'$2']
];
var errorCorrectionMashtotsToSovietInTheWord = [
    ['փօքր', 'փոքր'], ['ւու', 'վու'], ['նուեր', 'նվեր'],
    ['հրավէր', 'հրավեր'], ['հրէշ', 'հրեշ'],
    ['յաւէտ', 'հավետ'], ['գմբէթ', 'գմբեթ'], ['մէկ', 'մեկ'], ['յոլովակ', 'հոլովակ'],
    ['թէպէտ', 'թեպետ'], ['Աբէլ', 'Աբել'],
    ['մանրէ', 'մանրե'], ['սէրնդ', 'սերնդ'],
    ['սէրունդ', 'սերունդ'],  ['ղեկաւար', 'ղեկավար'], ['Յակոբ', 'Հակոբ'],
    ['ակտիւօրէն', 'ակտիւորէն'], ['ամենաւ', 'ամենավ'], ['ամէնուր', 'ամենուր'],
    ['սէրել', 'սերել'], ['սէրվ', 'սերվ'], ['անուերջ', 'անվերջ'],
    ['տոմսէր', 'տոմսեր'], ['բարոր', 'բարօր'],
    ['եղբօր', 'եղբոր'], ['երէկ', 'երեկ'],
    ['այով', 'աեօվ'], ['իդէալ', 'իդեալ'], ['յետո', 'հետո'],
    ['ոյեան', 'ոյան'], ['հաշիւ', 'հաշիվ'], ['յօդուած', 'յոդուած'], ['յորդոր', 'հորդոր'],
    ['ցօղ', 'ցող'], ['հրաւէր', 'հրավեր'],
    ['սկաւառ', 'սկավառ'], ['պօէմ', 'պոեմ'], ['րոպէ', 'րոպե'],
    ['('+beginningOfWord+')ևա(ան|յի|ին|ից|ով)('+endOfWord+')', 'եվա$2'],
    ['կը-', 'կ'], ['կինօ', 'կինո'], ['կոլեկտյու', 'կոլեկտիվ'],
    ['կ\'', 'կ'], ['նահենք', 'նայենք'], ['պատվէր', 'պատվեր'],
    ['տօրեն', 'տորեն'],['([^ատ]|['+alphabet+'][ա])նօրեն', '$1նորեն'],
    ['սօսնձ', 'սոսնձ'], ['տարիե', 'տարիէ'],['պահուսակ', 'պայուսակ'],
    ['('+beginningOfWord+')յարատ', '$1հարատ'],['առօտ', 'առոտ'],['պարզապես','պարզապէս'],
    ['վենեսվելա', 'վենեսուելա'],['վէստ','վեստ'],['փէտ(անալ|ացնել)', 'փետ$1'],
    ['պլեբէյ','պլեբեյ'],['աղվէս','աղվես'],['ռէակտ', 'ռեակտ'],['իօրեն', 'իորեն'],
    ['որինակ','օրինակ'],['('+beginningOfWord+')րոպյա','$1րոպեա'],['քվէա','քվեա'],
    ['մանրե([^լ])','մանրէ$1'],['ոքսիդ','օքսիդ'],
    ['քվէն','քվեն'],['քրէա','քրեա'],['ֆէստ(ոն|իվալ)','ֆեստ$1']
];
var errorCorrectionMashtotsToSoviet = [
    ['խո', 'խոյ'], ['Խո', 'Խոյ'],['Նո', 'Նոյ'], ['կայ', 'կա'],
    ['Կայ', 'Կա'],['մանրե', 'մանրէ'],['գէր', 'գեր'],
    ['Գէր', 'Գեր'],['չե', 'չէ'],['Չե', 'Չէ'], ['տարորինակ', 'տարօրինակ'],
    ['անոթևան', 'անօթևան'],['հրյա', 'հրեա'],['չեի', 'չէի'],['տերը','տէրը'],
    ['փէտ', 'փետ'],['շվուոց','շվվոց']
];
//ածանցներ և արմատներ, որոնք պետք է ուղղակի հիշվեն
var wordsParts = [
    ['ավոր', 'աւոր'], ['վետ', 'ւէտ'], ['ավուն', 'աւուն'], ['զեն', 'զէն'],
    ['դեմ', 'դէմ'],['դեպ', 'դէպ'], ['տեր', 'տէր'],
    ['աղետ', 'աղէտ'], ['արժեք', 'արժէք'], ['արեն', 'արէն'],
    ['գետ', 'գէտ'], ['դեպ', 'դէպ'], ['դետ', 'դէտ'],
    ['եղեն', 'եղէն'], ['երեն', 'երէն'], ['երեց', 'երէց'],
    ['կեն', 'կէն'], ['կետ', 'կէտ'],  ['մետ', 'մէտ'], ['մեջ', 'մէջ'],
    ['շեն', 'շէն'], ['պես', 'պէս'], ['սեր', 'սէր'], ['վեժ', 'վէժ'],
    ['վեպ', 'վէպ'], ['վերք', 'վէրք'], ['վրեպ', 'վրէպ'],['քեն', 'քէն'],
    ['օրեն', 'օրէն'],['աղեկեզ', 'աղեկէզ'],['աղետ', 'աղէտ'],
    ['աղվես', 'աղուէս'],['անզեն', 'անզէն'],
    ['անեծք', 'անէծք'],['անշեջ', 'անշէջ'],['աշղետ', 'աշղէտ'],['ապավեն', 'ապաւէն'],
    ['գեթ', 'գէթ'],['գեշ', 'գէշ'],['գես', 'գէս'],
    ['գմբեթ', 'գմբէթ'],['գոմեշ', 'գոմէշ'],['դեզ', 'դէզ'],['դեմ', 'դէմ'],
    ['ապաքեն', 'ապաքէն'],['առնետ', 'առնէտ'],['ասպարեզ', 'ասպարէզ'],
    ['արալեք', 'արալէք'],['արժեք', 'արժէք'],['բզեզ', 'բզէզ'],['բվեճ', 'բուէճ'],
    ['բրետ', 'բրէտ'],['զենք', 'զէնք'],['զենիթ', 'զէնիթ'],['ընդդեմ', 'ընդդէմ'],
    ['ընկեց', 'ընկէց'],['թեև', 'թէև'],['թեժ', 'թէժ'],['թեպետ', 'թէպէտ'],
    ['ժամկետ', 'ժամկէտ'],['ժապավեն', 'ժապաւէն'],['լեգեոն', 'լեգէոն'],
    ['խաբեություն', 'խաբէութիւն'],['խեթ', 'խէթ'],['խեժ', 'խէժ'],['խլեզ', 'խլէզ'],
    ['ծես', 'ծէս'],['ծովահեն', 'ծովահէն'],['ծվեն', 'ծուէն'],['կեզ', 'կէզ'],
    ['կես', 'կէս'],['կողպեք', 'կողպէք'],['կուզեկուզ', 'կուզէկուզ'],['դեմք', 'դէմք'],
    ['դեն', 'դէն'],['դեպի', 'դէպի'],['դեպք', 'դէպք'],['ելակետ', 'ելակէտ'],
    ['ելևեջ', 'ելևէջ'],['եզեգ', 'եզէգ'],['մեգ', 'մէգ'],['մեզ', 'մէզ'],['մեկ', 'մէկ'],
    ['մեջ', 'մէջ'],['մետ', 'մէտ'],['մողես', 'մողէս'],
    ['հավետ', 'յաւէտ'],['հետադեմ', 'յետադէմ'],['նշանդրեք', 'նշանդրէք'],['նվեր', 'նուէր'],
    ['շահեն', 'շահէն'],['շեկ', 'շէկ'],['շեն', 'շէն'],['ողջակեզ', 'ողջակէզ'],
    ['ուղեշ', 'ուղէշ'],['չեզոք', 'չէզոք'],['պանթեոն', 'պանթէոն'],['պարեն', 'պարէն'],
    ['պարետ', 'պարէտ'],['պարտեզ', 'պարտէզ'],['պետք', 'պէտք'],['պնակալեզ', 'պնակալէզ'],
    ['կրետ', 'կրէտ'],['հանպեդ', 'հանդէպ'],['հանդես', 'հանդէս'],
    ['հեգ', 'հէգ'],['հելլեն', 'հելլէն'],['հեն', 'հէն'],['հյուսկեն', 'հիւսկէն'],
    ['հրավեր', 'հրաւէր'],['հրեշ', 'հրէշ'],['հրշեջ', 'հրշէջ'],
    ['ձեթ', 'ձէթ'],['տեգ', 'տէգ'],['տերունական', 'տէրունական'],['տերտեր', 'տէրտէր'],
    ['տնօրեն', 'տնորէն'],['փոխարեն', 'փոխարէն'],['ջրվեժ', 'ջրվէժ'],['ջրօրհնեք', 'ջրօրհնէք'],
    ['սեգ', 'սէգ'],['սեզ', 'սէզ'],['սպառազեն', 'սպառազէն'],['վեճ', 'վէճ'],['վեմ', 'վէմ'],
    ['վեպ', 'վէպ'],['վէս', 'վես'],['վերք', 'վէրք'],['վրեժ', 'վրէժ'],['տարեց', 'տարէց'],
    ['փրփադեզ', 'փրփրադէզ'],['քարտեզ', 'քարտէզ'],['քեն', 'քէն'],
    ['քնեած', 'քնէած'],['քրեական', 'քրէական'],
    //բառամիջում օ հանդիպող հիմնական բառերը
    ['աղոթք', 'աղօթք'], ['աղոտ', 'աղօտ'], ['անոթ', 'անօթ'],
    ['առավոտ', 'առաւօտ'],['արոտ', 'արօտ'], ['արոր', 'արօր'],
    ['դրոշ', 'դրօշ'], ['զբոսն', 'զբօսն'], ['զգոն', 'զգօն'],
    ['զոդ', 'զօդ'], ['զոր', 'զօր'], ['թափոր', 'թափօր'],['թոշն', 'թօշն'], ['խոս', 'խօս'],
    ['կրոն', 'կրօն'],  ['հոտ', 'հօտ'],['ճոճ', 'ճօճ'],['մոտ', 'մօտ'],['տոն', 'տօն'],
    ['օրոր', 'օրօր'], ['ոք', 'օք'],['ոնք', 'օնք'], ['եոք', 'եօք'],
    ['անեծք', 'անէծք'],['լեգեոն', 'լեգէոն'], ['կուզեկուզ', 'կուզէկուզ'],
    ['պանթեոն', 'պանթէոն'],  ['ախպեր', 'ախպէր'], ['քրեական', 'քրէական'],
    ['չեզոք', 'չէզոք'],  ['պետք', 'պէտք'], ['հրեա', 'հրէայ'],
    ['պարետ', 'պարէտ'], ['քարտեզ', 'քարտէզ'], ['շեջ', 'շէջ'], ['պարտեզ', 'պարտէզ'],
    ['ընկեց', 'ընկէց'], ['ժետ', 'ժէտ'], ['կեզ', 'կէզ'],
    ['հանդես', 'հանդէս'], ['հրավեր', 'հրավէր'],['եիր', 'էիր'], ['եիք', 'էիք'],
    ['եոս', 'էոս'], ['եաս', 'էաս'],
    ['ակոս', 'ակօս'], ['աղորիք', 'աղօրիք'], ['ամոթ', 'ամօթ'],
    ['ապարոշ', 'ապարօշ'], ['արտոսր', 'արտօսր'],
    ['բռնազբոսիկ', 'բռնազբօսիկ'], ['բոթ', 'բօթ'], ['գոշ', 'գօշ'],
    ['գոս', 'գօս'], ['գոտի', 'գօտի'], ['դոդոշ', 'դօդօշ'],
    ['զոշաքաղ', 'զօշաքաղ'], ['թոթափ', 'թօթափ'], ['թոն', 'թօն'],
    ['թոթվել', 'թօթուել'], ['լոթի', 'լօթի'], ['լոլիկ', 'լօլիկ'], ['խոլ', 'խօլ'],
    ['ծանոթ', 'ծանօթ'], ['ծղոտ', 'ծղօտ'], ['ծնոտ', 'ծնօտ'],
    ['կարոտ', 'կարօտ'], ['կոշիկ', 'կօշիկ'], ['հետազոտ', 'հետազօտ'],
    ['ձոն', 'ձօն'], ['ղողանջ', 'ղօղանջ'], ['մոր', 'մօր'], ['յոդ', 'յօդ'], ['հոժար', 'յօժար'],
    ['հոնք', 'յօնք'], ['հոշոտել', 'յօշոտել'], ['հորանջ', 'յօրանջ'],
    ['հորին', 'յօրին'], ['նարոտ', 'նարօտ'], ['պռոշ', 'պռօշ'],
    ['սոլ', 'սօլ'], ['սոսի', 'սօսի'], ['սոսափ', 'սօսափ'],
    ['վառոդ', 'վառօդ'], ['տոթ', 'տօթ'], ['քող', 'քօղ'],['հայաց', 'հայեաց'],
    ['Գայանե', 'Գայեանէ'], ['դայակ', 'դայեակ'],['աերո', 'աէրո'], ['ավտո', 'աւտօ'],
    ['բեյրութ', 'բէյրութ'], ['գրավվե', 'գրաւուե'], ['գրավվի', 'գրաւուի'],
    ['վեք', 'ուէք'], ['եյան', 'եյեան'], ['փեշ', 'փէշ'], ['նեին', 'նէին'],
    ['հանգե', 'յանգե'], ['հեյ', 'հէյ'], ['մանյովր', 'մանեօւր'], ['մովսես', 'մովսէս'],
    ['շեֆական', 'շէֆական'],['պեծպծալի', 'պէծպծալի'],['ռադիո', 'ռադիօ'],
    ['չերքեզի', 'չէրքէզի'],['պատճե', 'պատճէ'],['պատնեշ', 'պատնէշ'],['պարգևվել','պարգեւուել'],
    ['պեծ', 'պէծ'],['պոեզիա', 'պօէզիա'],['պրոֆես', 'պրոֆէս'],['ջահել', 'ջահէլ'],
    ['ռաֆայել', 'ռաֆայէլ'],['սամվել', 'սամուէլ'],['սվերդ','սուերդ'],['սվեր','սուէր'],
    ['տվյալ','տուեալ'],['փոխնեփոխ','փոխնէփոխ'],['վույտ','ուոյտ'],['օվկիան','ովկիան'],
    ['օրեցօր','օրէցօր'],['հաբեշ','հաբէշ'],['հածել','յածել'],['հակոբ','յակոբ'],
    ['ոստրեբուծական','ոստրէբուծական'],['շվեդ','շուէդ']
];

function toMashtots(text){
    // word parts that have no rules
    for(var i in wordsParts){
        var rep_soviet0 = new RegExp(wordsParts[i][0], 'g');
        text = text.replace(rep_soviet0, wordsParts[i][1]);
    }
    // main spelling
    for(var i in data){
        var rep_soviet = new RegExp(data[i][0], 'g');
        text = text.replace(rep_soviet, data[i][1]);
    }
    // for mistakes in the word make right
    for(var i in errorCorrectionSovietToMashtotsInTheWord){
        var exp = errorCorrectionSovietToMashtotsInTheWord[i][0];
        var rep = errorCorrectionSovietToMashtotsInTheWord[i][1];
        var rep_soviet1 = new RegExp(exp, 'g');
        text = text.replace(rep_soviet1, rep);
    }
    // for mistakes make right
    for(var i in errorCorrectionSovietToMashtots){
        var exp = '(' + beginningOfWord + ')';
        exp += errorCorrectionSovietToMashtots[i][0];
        exp += '(' + endOfWord + ')';
        var rep = '$1' + errorCorrectionSovietToMashtots[i][1] + '$2';
        var rep_soviet1 = new RegExp(exp, 'g');
        text = text.replace(rep_soviet1,rep);
    }
    
    return text;
}

function toMashtotsTest(text){
    var temp, i;
    // word parts that have no rules
    for(i in wordsParts){
        var rep_soviet0 = new RegExp(wordsParts[i][0], 'g');
        temp = text;
        text = text.replace(rep_soviet0, wordsParts[i][1]);
        if(text !== temp){
            console.log(temp + '->' + text + ' (' + wordsParts[i][0] + ')');
        }
    }
    // main spelling
    for(i in data){
        var rep_soviet = new RegExp(data[i][0], 'g');
        temp = text;
        text = text.replace(rep_soviet, data[i][1]);
        if(text !== temp){
            console.log(temp + '->' + text + ' (' + data[i][0] + ')');
        }
    }
    // for mistakes in the word make right
    for(i in errorCorrectionSovietToMashtotsInTheWord){
        var exp = errorCorrectionSovietToMashtotsInTheWord[i][0];
        var rep = errorCorrectionSovietToMashtotsInTheWord[i][1];
        var rep_soviet1 = new RegExp(exp, 'g');
        temp = text;
        text = text.replace(rep_soviet1, rep);
        if(text !== temp){
            console.log(temp + '->' + text + ' (' + errorCorrectionSovietToMashtotsInTheWord[i][0] + ')');
        }
    }
    // for mistakes make right
    for(i in errorCorrectionSovietToMashtots){
        var exp = '(' + beginningOfWord + ')';
        exp += errorCorrectionSovietToMashtots[i][0];
        exp += '(' + endOfWord + ')';
        var rep = '$1' + errorCorrectionSovietToMashtots[i][1] + '$2';
        var rep_soviet1 = new RegExp(exp, 'g');
        temp = text;
        text = text.replace(rep_soviet1,rep);
        if(text !== temp){
            console.log(temp + '->' + text + ' (' + errorCorrectionSovietToMashtots[i][0] + ')');
        }
    }
    
    return text;
}


/*
Note: the reverse conversion is done in reverse order
because some rules applied in chain cause unwanted
side-effect, so order matters, and it needs to be
reversed in the reverse conversion
*/
function toSoviet(text){
    for(var i in wordsParts){
        var rep_mashtots0 = new RegExp(wordsParts[i][1], 'g');
        text = text.replace(rep_mashtots0, wordsParts[i][0]);
    }
    var k = data.length-1;
    for(var i in data){
        rep_mashtots = new RegExp(data[k-i][2], 'g');
        text = text.replace(rep_mashtots, data[k-i][3]);
    }
    // for mistakes in the word make right
    for(var i in errorCorrectionMashtotsToSovietInTheWord){
        var exp = errorCorrectionMashtotsToSovietInTheWord[i][0];
        var rep = errorCorrectionMashtotsToSovietInTheWord[i][1];
        var rep_soviet1 = new RegExp(exp, 'g');
        text = text.replace(rep_soviet1, rep);
    }
    for(var i in errorCorrectionMashtotsToSoviet){
        var exp = '(' + beginningOfWord + ')';
        exp += errorCorrectionMashtotsToSoviet[i][0];
        exp += '(' + endOfWord+  ')';
        var rep = '$1' + errorCorrectionMashtotsToSoviet[i][1] + '$2';
        var rep_soviet1 = new RegExp(exp, 'g');
        text = text.replace(rep_soviet1, rep);
    }
    return text;
}

function toSovietTest(text){
    var temp;
    for(var i in wordsParts){
        var rep_mashtots0 = new RegExp(wordsParts[i][1], 'g');
        temp = text;
        text = text.replace(rep_mashtots0, wordsParts[i][0]);
        if(text !== temp){
            console.log(temp + '->' + text + ' (' + wordsParts[i][1] + ')');
        }
    }
    var k = data.length-1;
    for(var i in data){
        rep_mashtots = new RegExp(data[k-i][2], 'g');
        temp = text;
        text = text.replace(rep_mashtots, data[k-i][3]);
        if(text !== temp){
            console.log(temp + '->' + text + ' (' + data[k-i][2] + ')');
        }
    }
    // for mistakes in the word make right
    for(var i in errorCorrectionMashtotsToSovietInTheWord){
        var exp = errorCorrectionMashtotsToSovietInTheWord[i][0];
        var rep = errorCorrectionMashtotsToSovietInTheWord[i][1];
        var rep_soviet1 = new RegExp(exp, 'g');
        temp = text;
        text = text.replace(rep_soviet1, rep);
        if(text !== temp){
            console.log(temp + '->' + text + ' (' + errorCorrectionMashtotsToSovietInTheWord[i][0] + ')');
        }
    }
    for(var i in errorCorrectionMashtotsToSoviet){
        var exp = '(' + beginningOfWord + ')';
        exp += errorCorrectionMashtotsToSoviet[i][0];
        exp += '(' + endOfWord+  ')';
        var rep = '$1' + errorCorrectionMashtotsToSoviet[i][1] + '$2';
        var rep_soviet1 = new RegExp(exp, 'g');
        temp = text;
        text = text.replace(rep_soviet1, rep);
        if(text !== temp){
            console.log(temp + '->' + text + ' (' + errorCorrectionMashtotsToSoviet[i][0] + ')');
        }
    }
    return text;
}

/*
 * Public methods
 */
module.exports.toMashtots = toMashtots;
module.exports.toSoviet = toSoviet;
module.exports.toMashtotsTest = toMashtotsTest;
module.exports.toSovietTest = toSovietTest;