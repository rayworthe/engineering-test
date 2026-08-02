import BookingsTable from './bookings-table';
import { euroClientApi } from '../../libs/euro-client-api';
import SitePage from '../components/site-page';

const Page = async () => {
    const bookings = await euroClientApi.bookings.list();

    return (
        <SitePage
            containerProps={{ p: 'md', fluid: true }}
            overflow={true}
        >
            <BookingsTable bookings={bookings}/>
        </SitePage>
    );
};

export default Page;
