import './listItems.scss';
import { API_STATUS } from '../../constants/constants';
import Button from '../button/button';

// this components should be an infinite scroll with virtualization, but for now is a list with a load more button
const ListItems = ({items = [], children, loadingComponent, loadingStatus, hasMore, loadMore, onRetry}) => {
  return (
    <>
      {
        items.map((item, index) => children(item, index))
      }
      {
        loadingStatus === API_STATUS.LOADING && <>{loadingComponent}</>
      }
      <div className='list-items__info'>
      {
        loadingStatus === API_STATUS.SUCCESS && 
          (hasMore ?
          <>
            <Button onClick={loadMore}>Load More</Button>
            Or try changing your filters
          </>
          :
          "No more items to display!")
      }
      {
        loadingStatus === API_STATUS.ERROR && 
          <>
            There was an error loading data.
            <Button onClick={onRetry}>Retry</Button>
          </>
      }
      </div>
    </>
  );
}

export default ListItems;