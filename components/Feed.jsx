import QuestionCard from './QuestionCard';
import SearchBar from './SearchBar';

const CardList = ({ data }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {
        data.map((post) => (
          <QuestionCard key={post._id} post={post} />
        ))
      }
    </div>
  )
}

const Feed = async () => {
  const response = await fetch('https://www.chargerpeer.com/api/questions', { next: { revalidate: 30 } });
  const data = await response.json();

  return (
    <section className='feed'>
      <SearchBar />
      <CardList data={data} />
    </section>
  )
}

export default Feed