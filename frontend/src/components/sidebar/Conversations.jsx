//will get the listed component and display

import GetConversation from './GetConversation';
const Conversations = () => {
  return (
        		<div className='py-2 flex flex-col overflow-auto'>
        			<GetConversation />
        			<GetConversation />
        			<GetConversation />
        			<GetConversation />
        		</div>
        	);
}

export default Conversations