import ArticleCover from './article-cover'
import ArticleContent from '../shared/article-content'
import { content } from '../../constants/article/yao-jen-to'

import ArticleWrapper from '../article/article-wrapper'

type Props = { detector: React.ReactNode }
export default function ArticleYaoJeoTo({ detector }: Props): JSX.Element {
  return (
    <ArticleWrapper>
      <ArticleCover></ArticleCover>
      <ArticleContent content={content} name="姚人多" id="">
        {detector}
      </ArticleContent>
    </ArticleWrapper>
  )
}
