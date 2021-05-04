const axios = require('axios');


const token = process.env.TRELLO_TOKEN
const key = process.env.TRELLO_APP_KEY
const auth = `key=${key}&token=${token}`
module.exports.card = {
    create: async (data) => {
        return await axios.post(
            `https://api.trello.com/1/cards?${auth}&idList=${data.list}`,
            {
                name: data.naskah.judul,
                desc: createDesc(data),
                pos: "top",

            },
            {
                headers: {
                    "Accept": "application/json"
                }
            }
        )
    },
    attach: async (file, cardID, cover = false, config) => {
        return await axios.post(
            `https://api.trello.com/1/cards/${cardID}/attachments?${auth}`,
            {
                file: file,
                cover: cover,
                ...config
            }
        )
    },
    submit: async (data) => {

        // bikin card
        const fetched = await this.card.create(data)

            // berhasil membuat card
            .then(res => {
                const card = res.data.id
                const naskah = naskahBin
                const foto = fotoBin

                // upload naskah ke card yang telah dibuat
                this.card.attach(naskah, card, false, {
                    name: data.naskah.judul,
                    mimeType: getMimeType(data.naskah.file)

                // berhasil mengupload naskah
                }).then(() => {

                    // upload foto ke card yang sudah dibuat
                    this.card.attach(foto, card, true, {
                        name: "Foto " + data.penulis.nama_lengkap,
                        mimeType: getMimeType(data.penulis.foto)

                    // berhasil mengupload foto
                    }).then(() => {

                        // proses berhasil dilaksanakan
                        return {
                            status: "Success",
                            message: "Card berhasil dibuat"
                        }

                        // gagal mengupload foto
                    }).catch(() => {
                        return {
                            status: "Error",
                            message: "Gagal mengupload foto"
                        }
                    })

                    // gagal mengupload naskah
                }).catch(() => {
                    return {
                        status: "Error",
                        message: "Gagal mengupload naskah",
                    }
                })
            })

            // gagal membuat card
            .catch(() => {
                return {
                    status: "Error",
                    message: "Gagal membuat card"
                }
            })


        // kebalikan nilai fetch
        return fetched
    }
}

const createDesc = (data) => {
    return `++KONTRIBUTOR BARU++
# Ada opini baru masuk

---

### ${data.naskah.judul}
${data.naskah.ringkasan}

**Topik**
${data.naskah.topik}

File Naskah [DOWNLOAD](${data.naskah.file})

---

### DETAIL PENULIS:
![${data.penulis.nama_lengkap}](${data.penulis.foto})
- PENULIS: ${data.penulis.nama_lengkap}
- EMAIL: ${data.penulis.email}
- BIOGRAFI: ${data.penulis.biografi}

---

### INFORMASI KONTAK
- WEBSITE: ${data.penulis.website}
- TWITTER: ${data.penulis.social_media.twitter}
- INSTAGRAM: ${data.penulis.social_media.instagram}
- LINKEDIN: ${data.penulis.social_media.linkedin}
- FACEBOOK: ${data.penulis.social_media.facebook}`
}

const getMimeType = (url) => {
    let regex = /(\.\w+)$/g;
    let ext = url.match(regex);
    switch (ext) {
        case ".doc":
            return "application/msword";
        case ".docx":
            return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        case ".rtf":
            return "application/rtf";
        case ".jpg" || ".jpeg":
            return "image/jpeg";
        case ".png":
            return "image/png";
        case ".bmp":
            return "image/bmp"
        default:
            return "application/msword";
    }
}