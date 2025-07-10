
const colors = {
    GREEN: 'green',
    BLUE: 'blue',
    RED: 'red',
    YELLOW: 'yellow',
    PURPLE: 'purple',
}


const MOCK_DATE = [
    {
        id: 1, title: 'Flexbox (CSS)', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', isFaforite: true, color: colors.YELLOW
    },

    { id: 2, title: 'Объекты (JavaScript)', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', isFaforite: false, color: colors.GREEN },

    { id: 3, title: 'Объекты (JavaScript)', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', isFaforite: false, color: colors.BLUE },

    { id: 4, title: 'Flexbox (CSS)', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', isFaforite: true, color: colors.RED },

    { id: 5, title: 'Объекты (JavaScript)', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', isFaforite: false, color: colors.PURPLE },
]


const model = {
    notes: [],
    addNote(user_note) {
        const id = new Date().getTime().toString()
        const isFaforite = false
        const note = { id: id, title: user_note.title, content: user_note.content, isFaforite: isFaforite, color: user_note.color }
        this.notes.unshift(note);
        view.renderNotes(this.notes)
        view.showMessageAdd()
    },

    deleteNote(noteID) {
        this.notes = this.notes.filter((el) => {
            return noteID !== el.id


        })
        view.renderNotes(this.notes)
        view.showMessage();
    },

    addFavorite(id) {
        const element = this.notes.find((el) => {
            return el.id === id
        })
        element.isFaforite = !element.isFaforite
        view.renderNotes(this.notes)
    }
}






const view = {
    init() {
        
        this.renderNotes(model.notes)


        // ============================================================================== ДОБАВЛЕНИЕ ЗАМЕТКИ с данных формы


        const form = document.querySelector('.forms')
        const input = document.querySelector('.input')
        const textarea = document.querySelector('.descr__input')


        // ........................................................................................... *цвет заметки*

        const color = document.querySelectorAll('.radius')
        for (let one_color of color) {
            one_color.addEventListener('click', function () {
                for (let only_color of color) {
                    only_color.classList.remove('is_active')
                }
                one_color.classList.add('is_active')
            })
        }
        // ........................................................................................................................................ 


        form.addEventListener('submit', function (event) {
            event.preventDefault()
            const title = document.querySelector('.input').value
            const content = document.querySelector('.descr__input').value
            const active_color = document.querySelector('.is_active')

            const colorValue = active_color ? active_color.id : null;

            controller.addNote(title, content, colorValue);
            if (!title.trim() || !content.trim() || title.length > 50) {

            } else {
                input.value = ''
                textarea.value = ''
            }
        })







    },
    renderNotes(notes) {
        // ======================================================================================================== отображение блоков верстки
        if (notes.length) {
            const text = document.querySelector('.text_foot')

            text.style.display = 'none'

            const check = document.querySelector('.checkbox')
            check.style.display = 'flex'
        } else {
            const text = document.querySelector('.text_foot')
            text.style.display = 'block'

            const check = document.querySelector('.checkbox')
            check.style.display = 'none'
        }





        


        // ============================================================================================================= (... продолжаем рендер)

        const container = document.querySelector('.cards')

        let notesHTML = ''

        for (let note of notes) {
            notesHTML += `
            <div class="card" id=${note.id}>
                <div class="card_name ${note.color}" >
                    <div>${note.title}</div>
                    <div class="card_icons">
                        <img src="${note.isFaforite ? 'img/icons/favorite.svg' : 'img/icons/not favorite.svg'}" class="icon" alt="favorite">

                        <img src="img/icons/delete.svg" class="del" alt="delete">

                    </div>

                </div>

                <div class="card_descr"> ${note.content} </div>
            </div>`
        }

        container.innerHTML = notesHTML


        
  

        // =================================================================================================  удаляем заметку



        const deleteIcons = container.querySelectorAll('.del')
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', function (event) {
                const card = event.target.closest('.card');
                if (card) {
                    const noteId = card.id;
                    controller.deleteNote(noteId)
                }
            });
        });




        // ====================================================================================================   отображение кол-ва заметок


        const countElement = document.getElementById('count')
        countElement.textContent = notes.length;


        //  ================================================================= здесь меняем ИЗБРАННОЕ

        const icons = document.querySelectorAll('.icon')

        for (let icon of icons) {
            icon.addEventListener('click', function () {
                const cardIDi = icon.parentElement
                console.log(cardIDi);
                const cardIDn = cardIDi.parentElement
                const cardID = cardIDn.parentElement
                const IDc = cardID.id
                console.log(cardID);
                console.log(IDc);


                controller.addFavorite(IDc)

            })
        }



        // ================================================================================ чекбокс - отображение только избранных заметок

        const check = document.querySelector('.check')


        check.addEventListener('change', function (event) {

            controller.filtreOfFavorite(event.currentTarget.checked)
        })
    },


    // ================================================================================== всплытие сообщений 'удалена'
    showMessage() {
        const message = document.getElementById('delete_mess')
        message.style.display = 'flex'



        setTimeout(() => {
            message.style.display = 'none'
        }, 3000)



    },

    // =================================================================================================  всплытие сообщений 'добавлена'
    showMessageAdd() {
        const addMess = document.getElementById('add_mass')
        addMess.style.display = 'flex'
        setTimeout(() => {
            addMess.style.display = 'none'
        }, 3000)


    },


    // ======================================================= ЗАПОЛНИТЕ ВСЕ ПОЛЯ
    showMessageEmpty(mass) {
        const emp = document.getElementById('empty_mass')
        if (mass) {
            emp.style.display = 'flex'
            setTimeout(() => {
                emp.style.display = 'none'
            }, 1500)
        } else {
            emp.style.display = 'none'
        }
    },




    // ========================================================           не больше 50 символов

    showMessageSymb() {
        const message = document.getElementById('max_mass')
        message.style.display = 'flex'
        setTimeout(() => {
            message.style.display = 'none'
        }, 1500)
    }
}








const controller = {
    addNote(title, content, active_color) {
        if (!title.trim() || !content.trim()) {
            view.showMessageEmpty(true)

            return
        } else if (title.length > 50) {
            view.showMessageSymb()
            return
        }
        model.addNote({ title, content, color: active_color })
        view.showMessageEmpty(false);





    },
    deleteNote(noteId) {
        model.deleteNote(noteId)
    },
    addFavorite(ID) {
        model.addFavorite(ID)
    },

    filtreOfFavorite(fav) {
        let displayNotes = []
        console.log(displayNotes);
        console.log(fav);
        if (fav) {
            displayNotes = model.notes.filter((el) => {
                return el.isFaforite
            })
        } else {
            displayNotes = model.notes
        }
        view.renderNotes(displayNotes)
        console.log(displayNotes);
    }
}





function init() {
    view.init()
}
init()

