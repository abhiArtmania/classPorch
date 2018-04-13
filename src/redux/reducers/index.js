
import AuthReducer from './AuthReducer';
import DashboardReducer from './DashboardReducer';
import SearchReducer from './SearchReducer';
import ProfileReducer from './ProfileReducer';
import ChatReducer from './ChatReducer';
import MessageReducer from './MessageReducer';
import tutors from './tutor';

export default {
    auth: AuthReducer,
    dashboard: DashboardReducer,
    search: SearchReducer,
    profileState: ProfileReducer,
    chatReducer: ChatReducer,
    messageReducer: MessageReducer,
    tutors
}