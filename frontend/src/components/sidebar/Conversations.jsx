//will get the listed component and display

import useGetConversations from "../../hooks/useGetConversations";
import GetConversation from "./GetConversation";

const Conversations = () => {

  const { loading, conversations } = useGetConversations();
//   console.log("conversations: ", conversations);  // Properly log the conversations array

return (
	<div className='py-2 flex flex-col overflow-auto'>
		{conversations.map((conversation, idx) => (
			<GetConversation
				key={conversation._id}
				conversation={conversation}
				lastIdx={idx === conversations.length - 1}
			/>
		))}

		{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
	</div>
);
};

export default Conversations;
