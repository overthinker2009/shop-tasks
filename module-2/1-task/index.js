export default class UserTable {
  elem;

  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement('table')
    this.render()
  }

  get elem() {
    return this.elem;
  }

  render() {
    let tableCreate =
      `<table>
    <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>
    <tbody> ${this.rows.map(item => `
        <tr>
            <td>Вася</td>
            <td>25</td>
            <td>1000</td>
            <td>Самара</td>
            <td><button>X</button></td>
        </tr>

      `).join('')}
      </tbody>
      `;




    this.elem.innerHTML = tableCreate

    this.elem.addEventListener('click', (event) => {
      if (event.target.matches('button')) {
        event.target.parentNode.parentNode.remove();
      }
    });
  }
}
