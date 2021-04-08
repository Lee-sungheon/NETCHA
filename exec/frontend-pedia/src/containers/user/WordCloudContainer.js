import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { listTags } from '../../modules/tags';
import WordCloud from '../../components/user/WordCloud';
import Loader from '../../components/common/Loader';

var keywords = [];

const WordCloudContainer = ({ userId }) => {
  const dispatch = useDispatch();
  const { tags, error, loading } = useSelector(({ tags, loading }) => ({
    tags: tags.tags,
    error: tags.error,
    loading: loading['tags/LIST_TAGS'],
  }));

  useEffect(() => {
    dispatch(listTags({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    setKeywords();
  }, [dispatch, tags]);

  const setKeywords = () => {
    if (tags) {
      keywords = [];
      for (var tag in tags.keyword) {
        keywords.push({ text: tag, value: tags.keyword[tag] });
      }
    }
  };

  if (loading)
    return <Loader type="spin" color="#ff0073" message="LOADING..." />;

  return (
    <>
      {keywords && keywords.length > 0 && (
        <WordCloud
          tags={keywords.length > 0 ? keywords : null}
          error={error}
          loading={loading}
        />
      )}
    </>
  );
};

export default withRouter(WordCloudContainer);
