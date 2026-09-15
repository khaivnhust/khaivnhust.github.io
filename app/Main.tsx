'use client'

import { motion } from 'framer-motion'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <motion.div
          className="relative overflow-hidden pt-8 pb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="from-primary-100 via-primary-50 dark:from-primary-900/40 dark:via-primary-900/10 pointer-events-none absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full bg-gradient-to-br to-transparent blur-3xl dark:to-transparent" />
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Image
              src="/static/images/avatar.png"
              alt={siteMetadata.author}
              width={96}
              height={96}
              className="ring-primary-200 dark:ring-primary-800 h-20 w-20 rounded-full object-cover ring-4 sm:h-24 sm:w-24"
            />
            <div className="space-y-2 md:space-y-3">
              <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-tight dark:text-gray-100">
                Xin chào, tôi là{' '}
                <span className="from-primary-500 to-primary-700 bg-gradient-to-r bg-clip-text text-transparent">
                  {siteMetadata.author}
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-7 text-gray-500 dark:text-gray-400">
                {siteMetadata.description}
              </p>
            </div>
          </div>
        </motion.div>
        <StaggerContainer className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <StaggerItem key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
