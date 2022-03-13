
import './listItems.scss';
import { API_STATUS } from '../../constants/constants';

const ListItems = ({items = [], children, loadingComponent, loadingStatus, hasMore, loadMore, onRetry}) => {
  return (
    <>
      {
        items.map(item => children(item))
      }
      {
        loadingStatus === API_STATUS.LOADING && <>{loadingComponent}</>
      }
      <div className='list-items__info'>
      {
        loadingStatus === API_STATUS.SUCCESS && 
          (hasMore ?
          <>
            <button onClick={loadMore}>Load More</button>
            Or try changing your filters
          </>
          :
          "No more items to display!")
      }
      {
        loadingStatus === API_STATUS.ERROR && 
          <>
            There was an error loading data.
            <button onClick={onRetry}>Retry</button>
          </>
      }
      </div>
    </>
  );
}

export default ListItems;