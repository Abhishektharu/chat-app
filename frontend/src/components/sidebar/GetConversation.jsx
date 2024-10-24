//will get the individual conversations listed in sidebar;
import useConversation from "../../zustand/useConversation";

const GetConversation = ({conversation, lastIndex}) => {
	// console.log(conversation);
	const {selectedConversation, setSelectedConversation} = useConversation();
	// console.log(conversation);
	// console.log(selectedConversation);
	
	
	// console.log(selectedConversation);
	// console.log(setSelectedConversation);
	const isSelected = selectedConversation?._id === conversation._id;
	// console.log(isSelected);
	
  return (
      		<>
      			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
      				<div className='avatar online'>
      					<div className='w-12 rounded-full'>
      						<img
      							src={conversation.profilePic}
      							alt='user avatar'
      						/>
      					</div>
      				</div>
      
      				<div className='flex flex-col flex-1'>
      					<div className='flex gap-3 justify-between'>
      						<p className='font-bold text-gray-200'>{conversation.username}</p>
      						<span className='text-xl'>🎃</span>
      					</div>
      				</div>
      			</div>
      
      			<div className='divider my-0 py-0 h-1' />
      		</>
      	);
}

export default GetConversation