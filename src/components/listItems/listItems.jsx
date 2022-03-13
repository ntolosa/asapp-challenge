
import './listItems.scss';
import { API_STATUS } from '../../constants/constants';

// this components should be an infinite scroll with virtualization, but for now is a list with a load more button
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