
import React from 'react';
import ReactPaginate from 'react-paginate';
class EditableTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          data: [],
          loading: true,
          error: null,
         currentPage: 1,
         itemsPerPage: 20,
         pageCount: 0
        };
      }
    
      componentDidMount() {
        fetch('/results')
          .then(response => response.json())
          .then(data => {
            const pageCount = Math.ceil(data.length / this.state.itemsPerPage);
            this.setState({
              data: data,
              loading: false,
              error: null,
              pageCount: pageCount
            });
          })
          .catch(error => {
            this.setState({
              data: [],
              loading: false,
              error: error
            });
          });
      }
      handleDataChange = (event, id, field) => {
        const { data } = this.state;
        const newData = [...data];
        const index = newData.findIndex((d) => d.id === id);
        newData[index][field] = event.target.value;
        this.setState({ data: newData });
      };

      handlePageChange = (event, page) => {
        this.setState({ currentPage: page });
      };


      getCurrentPageData = () => {
        const { data, currentPage, itemsPerPage } = this.state;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
      };
      render() {
        const { currentPage, itemsPerPage } = this.state;
        const data = this.getCurrentPageData();
        return (
          <div>
            <table>
              <thead>
                <tr>
                <th > Index</th>
                 <th>Length</th>
                <th>Diameter</th>
                <th>Height</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td> {item.id}</td>
                    <td>
                      <input
                        type="text"
                        value={item.Length}
                        onChange={(e) => this.handleDataChange(e, item.id, 'Length')}
                      />
                    </td>
                    <td>{item.Diameter}</td>
                    <td>
                      <input
                        type="text"
                        value={item.Height}
                        onChange={(e) => this.handleDataChange(e, item.id, 'Height')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
           currentPage={currentPage}
           itemsPerPage={itemsPerPage}
           pageCount={this.state.pageCount}
           totalItems={this.state.data.length}
           onPageChange={this.handlePageChange}
      />
          </div>
        );
                }
}

export default EditableTable;
