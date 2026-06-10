import type { Post } from '@/lib/data'
import styles from './FounderPost.module.css'

export default function FounderPost({ post }: { post: Post }) {
  return (
    <article className={styles.post}>
      <div className={styles.avatar}>F</div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.author}>{post.author}</span>
          <span className={styles.date}>{post.date}</span>
        </div>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.body}>{post.body}</p>
      </div>
    </article>
  )
}
