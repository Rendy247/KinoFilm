const moviesDatabase = [
  {
      id: 1,
      title: "Звездные войны. Эпизод 1",
      type: "фильм",
      genre: "фантастика",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrL6nEowCWBlq9DWaqVMhBMV4zrQXpwngd1Q&s",
      link: "filmlist.html?id=1",
      description: "Фильм начинается с дипломатической миссии, в которой рыцари-джедаи Квай-Гон Джинн и его ученик Оби-Ван Кеноби отправляются на планету, чтобы урегулировать торговый спор. Однако их переговоры с Торговой Федерацией терпят неудачу, и герои вынуждены спасаться бегством. Они обнаруживают, что планета подверглась блокаде и вторжению, и решают помочь местному правителю, королеве Падме Амидале, избежать захвата. Вместе они отправляются на столицу Галактической Республики, чтобы попросить помощи.",
      videoPlayers: {
          1: "https://api.variyt.ws/embed/movie/204",
          2: "https://vkvideo.ru/video_ext.php?oid=-233305175&id=456240575&hash=6d777ad756596ed5&hd=3",
          3: "",
          trailer: "https://vkvideo.ru/video_ext.php?oid=-40191159&id=456263044&hash=f9da1b9607bf628b&hd=3"
      },
      backgroundImage: "https://static.okko.tv/images/v4/d01c6fab-23c0-465d-9554-7295514c080d?scale=1&quality=80"
  },
    {
      id: 2,
      title: "Звездные войны. Эпизод 2",
      type: "фильм",
      genre: "фантастика",
      image: "https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/1216c8d2-9c47-49e9-b5c2-e8d5f01ca0ac/220x330",
      link: "filmlist.html?id=2",
      description: "Действие разворачивается спустя десять лет после событий предыдущего фильма. Республика погружается в хаос, и тысячи планет грозят выйти из её состава. Рыцарь-джедай Оби-Ван Кеноби и его ученик Энакин Скайуокер получают задание защитить сенатора Падме Амидала от покушения. Энакин, теперь взрослый падаван, испытывает противоречивые чувства, включая любовь к Падме, что запрещено кодексом джедаев, усложняя его внутреннюю борьбу и отношения с учителем.",
      videoPlayers: {
        1: "https://api.variyt.ws/embed/movie/205",
        2: "https://vkvideo.ru/video_ext.php?oid=485771195&id=456240748&hash=dd348f34c45dd094&hd=3",
        3: "",
        trailer: "https://vkvideo.ru/video_ext.php?oid=-132343249&id=456243444&hash=a993bc780f752ac9&hd=3"
      },
      backgroundImage: "https://static.okko.tv/images/v4/afcfb359-5e92-49af-bd90-abd6feb63f4e?scale=1&quality=80"
  },
  {
    id: 3,
    title: "Звездные войны. Эпизод 3",
    type: "фильм",
    genre: "фантастика",
    image: "https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/2720c811-4065-43cf-9fc5-bd18ee3dbbf0/220x330",
    link: "filmlist.html?id=3",
    description: "Фильм начинается с дипломатической миссии, в которой рыцари-джедаи Квай-Гон Джинн и его ученик Оби-Ван Кеноби отправляются на планету, чтобы урегулировать торговый спор. Однако их переговоры с Торговой Федерацией терпят неудачу, и герои вынуждены спасаться бегством. Они обнаруживают, что планета подверглась блокаде и вторжению, и решают помочь местному правителю, королеве Падме Амидале, избежать захвата. Вместе они отправляются на столицу Галактической Республики, чтобы попросить помощи.",
    videoPlayers: {
      1: "https://api.variyt.ws/embed/movie/206",
      2: "https://vkvideo.ru/video_ext.php?oid=-80021931&id=456242272&hash=0eb9d472e4e93da0&hd=3",
      3: "",
      trailer: "https://vkvideo.ru/video_ext.php?oid=-56950139&id=456241399&hash=e205baa99dd45fed&hd=3"
    },
    backgroundImage: "https://static.okko.tv/images/v4/51852498-fd96-486a-b562-df1ec596dda6?scale=1&quality=80"
},
{
       id: 4,
       title: "Звездные войны. Эпизод 4",
       type: "фильм",
       genre: "фантастика",
       image: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/9bdc6690-de82-4a8c-a114-aa3a353bc1da/220x330",
       link: "filmlist.html?id=4",
       description: "В далекой-далекой галактике, принцесса Лея, лидер повстанцев, захватывает чертежи космической станции, чтобы спасти галактику от зловещей Империи. Её корабль подвергается нападению, и она успевает спрятать данные в дроида R2-D2 вместе с просьбой о помощи. Дроид, вместе с другим дроидом - C-3PO, попадает на пустынную планету, где их находит юный фермер Люк Скайуокер. Люк вскоре узнает о своём предназначении и решает помочь в борьбе с Империей.",
       videoPlayers: {
         1: "https://api.variyt.ws/embed/movie/207",
         2: "https://vkvideo.ru/video_ext.php?oid=-231303719&id=456239018&hash=17e282787982f8d5&hd=3",
         3: "",
         trailer: ""
       },
       backgroundImage: "https://static.okko.tv/images/v4/ca1cb4b4-724b-4ee8-b5fb-ec63c8c4dde3?scale=1&quality=80"
     }
];
window.moviesDatabase = moviesDatabase;
