
let kutubhona = [];
let foydalanuvchilar = [];

function add_book() {
    const kitob_nomi = prompt("Kitob nomini kiriting:");
    const mualif_nomi = prompt("Muallif nomini kiriting:");
    const kitob_soni = prompt("Kitob sonini kiriting:");

    if (!kitob_nomi || kitob_nomi.trim() === "") {
        console.log("Kitob nomini kiriting!");
        return;
    }

    if (!mualif_nomi || mualif_nomi.trim() === "") {
        console.log("Muallif nomini kiriting!");
        return;
    }

    if (
        kitob_soni === null ||
        kitob_soni.trim() === "" ||
        !Number.isInteger(Number(kitob_soni)) ||
        Number(kitob_soni) <= 0
    ) {
        console.log("Musbat butun son kiriting!");
        return;
    }

    const mavjud_kitob = kutubhona.find(
        kitob => kitob.nomi.toLowerCase() === kitob_nomi.trim().toLowerCase()
    );

    if (mavjud_kitob) {
        mavjud_kitob.soni += Number(kitob_soni);
        console.log("Kitob soni yangilandi!");
        return;
    }

    kutubhona.push({
        nomi: kitob_nomi.trim(),
        mualifi: mualif_nomi.trim(),
        soni: Number(kitob_soni)
    });

    console.log("Kitob qo‘shildi!");
}

function show_available_books() {
    if (kutubhona.length === 0) {
        console.log("Kutubxonada kitob yo‘q!");
        return;
    }

    for (const kitob of kutubhona) {
        console.log("Nomi:", kitob.nomi);
        console.log("Muallifi:", kitob.mualifi);
        console.log("Qolgan soni:", kitob.soni);
        console.log("---------------");
    }
}

function borrow_book() {
    const foydalanuvchi_nomi = prompt("Ismingizni kiriting:");
    if (!foydalanuvchi_nomi || foydalanuvchi_nomi.trim() === "") {
        console.log("Ismingizni kiriting!");
        return;
    }

    const kitob_nomi = prompt("Qaysi kitobni olmoqchisiz?");
    if (!kitob_nomi || kitob_nomi.trim() === "") {
        console.log("Kitob nomini kiriting!");
        return;
    }

    const kitob = kutubhona.find(
        k => k.nomi.toLowerCase() === kitob_nomi.trim().toLowerCase()
    );

    if (!kitob) {
        console.log("Bunday kitob topilmadi!");
        return;
    }

    if (kitob.soni <= 0) {
        console.log("Bu kitob qolmagan!");
        return;
    }

    kitob.soni--;

    foydalanuvchilar.push({
        niki: foydalanuvchi_nomi.trim(),
        kitob_nomi: kitob.nomi
    });

    console.log("Kitob berildi!");
    console.log("Qolgan nusxalar:", kitob.soni);
}

function return_book() {
    const foydalanuvchi_nomi = prompt("Ismingizni kiriting:");
    if (!foydalanuvchi_nomi || foydalanuvchi_nomi.trim() === "") {
        console.log("Ismingizni kiriting!");
        return;
    }

    const kitob_nomi = prompt("Qaysi kitobni qaytarasiz?");
    if (!kitob_nomi || kitob_nomi.trim() === "") {
        console.log("Kitob nomini kiriting!");
        return;
    }

    const index = foydalanuvchilar.findIndex(
        f => f.niki.toLowerCase() === foydalanuvchi_nomi.trim().toLowerCase() &&
             f.kitob_nomi.toLowerCase() === kitob_nomi.trim().toLowerCase()
    );

    if (index === -1) {
        console.log("Siz bu kitobni olmagansiz!");
        return;
    }

    const kitob = kutubhona.find(
        k => k.nomi.toLowerCase() === kitob_nomi.trim().toLowerCase()
    );

    if (kitob) {
        kitob.soni++;
    }

    foydalanuvchilar.splice(index, 1);
    console.log("Kitob qaytarildi!");
}

function show_users_books() {
    if (foydalanuvchilar.length === 0) {
        console.log("Hozir hech kim kitob olmagan!");
        return;
    }

    for (const foydalanuvchi of foydalanuvchilar) {
        console.log("Foydalanuvchi:", foydalanuvchi.niki);
        console.log("Olgan kitobi:", foydalanuvchi.kitob_nomi);
        console.log("---------------");
    }
}

while (true) {
    const tanlov = prompt(
        "KUTUBXONA MENYUSI\n" +
        "1. Kitob qo‘shish\n" +
        "2. Kitoblarni ko‘rish\n" +
        "3. Kitob olish\n" +
        "4. Kitob qaytarish\n" +
        "5. Foydalanuvchilar olgan kitoblar\n" +
        "0. Chiqish\n\n" +
        "Tanlovni kiriting:"
    );

    if (tanlov === null || tanlov === "0") {
        console.log("Dastur tugadi!");
        break;
    } else if (tanlov === "1") {
        add_book();
    } else if (tanlov === "2") {
        show_available_books();
    } else if (tanlov === "3") {
        borrow_book();
    } else if (tanlov === "4") {
        return_book();
    } else if (tanlov === "5") {
        show_users_books();
    } else {
        console.log("Noto‘g‘ri tanlov! 0 dan 5 gacha tanlang.");
    }
}
