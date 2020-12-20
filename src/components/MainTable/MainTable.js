import utils from '../../Utils';
import * as constants from '../../constants/constants';
import * as tableUtils from './MainTable.utils';

export default class MainTable {
  constructor(data) {
    this.data = data;
    this.country = null;
    this.countsData = null;
    this.countElems = null;
    this.tableData = null;
    this.wrapper = document.querySelector('.countries-table');
    this.tbody = null;
    this.thead = null;
    this.table = null;
    this.search = null;
    this.initCount();
  }

  events() {
    this.tbody.addEventListener('click', ({ target }) => {
      if (target.classList.contains('country-btn')) {
        const event = new Event('keyup');

        this.country = target.textContent;
        this.search.value = this.country;
        this.search.dispatchEvent(event);
      }
    });
  }

  render() {
    this.wrapper.innerHTML = tableUtils.getMainChunk();
    this.tbody = this.wrapper.querySelector('.countries-table__body');
    this.thead = this.wrapper.querySelector('.countries-table__head');
    this.renderHead();
  }

  renderHead() {
    const th = this.data.titles.map((type) => tableUtils.getTh(type));

    this.thead.innerHTML = `${th.join(' ')}`;
  }

  getCountElems() {
    this.countElems = this.data.typesTitles.reduce((acc, item) => {
      const obj = { ...acc };

      obj[item] = this.item.querySelector(`[data-label="${item}"]`);
      return obj;
    }, {});
  }

  async initCount() {
    const url = constants.apiUrls.worldometers;
    const urlParameter = constants.worldParameters.countries;
    const countData = await utils.fetchData(url, this.data.sort, urlParameter);

    this.countsData = countData;
    this.renderCount();
    this.events();
  }

  renderCount() {
    this.countsData.forEach((data) => {
      const tr = document.createElement('tr');
      const caseElem = tableUtils.getElement('td', data.cases);
      const deathsElem = tableUtils.getElement('td', data.deaths);
      const recoveredsElem = tableUtils.getElement('td', data.recovered);
      const flagElem = tableUtils.getElement('td', `<img width="20" src="${data.countryInfo.flag}" alt="country">`);
      const countryBtn = tableUtils.getElement('td', `<button class="country-btn">${data.country}</button>`);

      this.tbody.append(tr);
      tr.append(caseElem);
      tr.append(deathsElem);
      tr.append(recoveredsElem);
      tr.append(flagElem);
      tr.append(countryBtn);
    });

    this.tableData = new window.DataTable('#dataTable');
    this.search = this.wrapper.querySelector('.dataTable-search input');
  }
}
