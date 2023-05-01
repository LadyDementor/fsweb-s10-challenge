import axios from "axios";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";

export function notEkle(not) {
  return {
    type: NOT_EKLE,
    payload: not,
  };
}

export function notSil(notId) {
  return {
    type: NOT_SIL,
    payload: notId,
  };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        dispatch(notEkle(yeniNot));
      }
    })
    .catch((error) => console.log(error));
};

export const notSilAPI = (id) => (dispatch) => {
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        dispatch(notSil(id));
      }
    })
    .catch((error) => console.log(error));
};

const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    localStorageStateYaz(key, baslangicDegerleri);
    return baslangicDegerleri;
  }
}

function reducer(
  state = baslangicNotlariniGetir(s10chLocalStorageKey),
  action
) {
  switch (action.type) {
    case NOT_EKLE:
      const yeniNotlar = [...state.notlar, action.payload];
      localStorageStateYaz(s10chLocalStorageKey, {
        ...state,
        notlar: yeniNotlar,
      });
      return {
        ...state,
        notlar: yeniNotlar,
      };
    case NOT_SIL:
      localStorageStateYaz(s10chLocalStorageKey, {
        ...state,
        notlar: state.notlar.filter((note) => note.id !== action.payload),
      });
      return {
        ...state,
        notlar: state.notlar.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
}

export default reducer;
