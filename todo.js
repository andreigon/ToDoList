const todo = {
    action(e) {},
    add() {},
    create(text) {},
    init() {
        const fromStorage = localStorage.getItem('todo');
        if (fromStorage){
            document.querySelector('.todo_items').innerHTML = fromStorage;
        }
        document.querySelector('.todo_option').addEventListener('change',this.update);
        document.addEventListener('click', this.action.bind(this));
    },
    update() {},
    save() {}
}