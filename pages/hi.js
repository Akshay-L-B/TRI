import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <div className='relative w-full overflow-hidden border border-teal-500 hover:border-2 rounded-lg sm:w-[300px] transition-all'>
      <Link href='#'>
          <img
            src='https://wallpapercave.com/wp/wp2049736.jpg'
            alt='post cover'
            className='h-[200px] w-full object-cover transition-all duration-300 transform hover:scale-105'
          />
      </Link>
      <div className='p-3'>
        <p className='text-lg font-semibold line-clamp-2 mb-2'>Title</p>
        <span className='italic text-sm text-gray-500'>Subtitle</span>
          <Link href='#' className='block mt-2 border-t border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2'>
            Read article
        </Link>
      </div>
    </div>
  );
}
