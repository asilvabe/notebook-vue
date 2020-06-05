Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'))

// New VueJS instance
new Vue({
    name: 'notebookApp',

    el: '#notebookApp',

    data() {
        return {
            // These are loaded from localStorage and have a default value
            // Don't forget the JSON parsing for the notes array
            notes: [],
            selectedId: null,
        }
    },

    // Computed properties
    computed: {
        selectedNote() {
            // We return the matching note with selectedId
            return this.notes.find(note => note.id === this.selectedId)
        },

        notePreview() {
            // Markdown rendered to HTML
            return this.selectedNote ? marked(this.selectedNote.content) : ''
        },

        sortedNotes() {
            return this.notes.slice().sort((a, b) => a.created - b.created)
                .sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1)
        },

        linesCount() {
            if (this.selectedNote) {
                // Count the number of new line characters
                return this.selectedNote.content.split(/\r\n|\r|\n/).length
            }
        },

        wordsCount() {
            if (this.selectedNote) {
                var s = this.selectedNote.content
                // Turn new line cahracters into white-spaces
                s = s.replace(/\n/g, ' ')
                // Exclude start and end white-spaces
                s = s.replace(/(^\s*)|(\s*$)/gi, '')
                // Turn 2 or more duplicate white-spaces into 1
                s = s.replace(/[ ]{2,}/gi, ' ')
                // Return the number of spaces
                return s.split(' ').length
            }
        },

        charactersCount() {
            if (this.selectedNote) {
                return this.selectedNote.content.split('').length
            }
        },
    },

    methods: {
        // Add a note with some default content and select it
        addNote() {
            const time = Date.now()
            
            // Default new note
            const note = {
                id: String(time),
                title: 'Título nota ' + (this.notes.length + 1),
                content: '**Hola!** 👋   \n\nEste notebook está utilizando **markdown** para darle formato a tus notas!',
                created: time,
                favorite: false,
            }
            
            // Add the new note to the notes array
            this.notes.push(note)
            
            // Select the note
            this.selectNote(note)
        },

        // Remove the selected note and select the next one
        removeNote(note) {
            var index;
            
            if(note) {
                index = this.notes.indexOf(note);
            }
            else if(this.selectedNote) {
                index = this.notes.indexOf(this.selectedNote);
            }
            
            // Remove the note in the notes array
            if (index !== -1) {
                this.notes.splice(index, 1)
            }
        },

        selectNote(note) {
            // This will update the 'selectedNote' computed property
            this.selectedId = note.id
        },
    },
})
