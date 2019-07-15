import React from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { Redirect } from 'react-router';

import Modal from '../Modal';
import { GET_RECIPES_QUERY } from '../queries';

const DELETE_RECIPE_MUTATION = gql`
  mutation DELETE_RECIPE_MUTATION($slug: String) {
    deleteRecipe(slug: $slug) {
      deleted
      message
    }
  }
`;

interface Props {
  slug: string;
}

interface IDeletedRecipe {
  deleteRecipe: {
    deleted: boolean;
    message: string;
  };
}

function DeleteRecipe({ slug }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalContent, setModalContent] = React.useState(<p />);

  function openModal() {
    setModalOpen(true);
    setModalTitle('Delete Recipe?');
    setModalContent(<p>Are you sure you want to delete this recipe?</p>);
  }

  function deleteRecipeAndCloseModal(deleteRecipe: MutationFn, slug: string) {
    deleteRecipe({ variables: { slug } });
    setModalOpen(false);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <Mutation
      mutation={DELETE_RECIPE_MUTATION}
      variables={{ slug }}
      refetchQueries={[{ query: GET_RECIPES_QUERY }]}
    >
      {(
        deleteRecipe: MutationFn,
        { data, loading }: MutationResult<IDeletedRecipe>
      ) => {
        return (
          <>
            <button
              onClick={openModal}
              className="button button-dangerous"
              disabled={loading}
            >
              Delete Recipe
            </button>
            <Modal
              modalOpen={modalOpen}
              title={modalTitle}
              content={modalContent}
              actionName="Delete Recipe"
              actionType="dangerous"
              onAction={() => deleteRecipeAndCloseModal(deleteRecipe, slug)}
              closeFn={closeModal}
            />
            {data && data.deleteRecipe && <Redirect to="/" />}
          </>
        );
      }}
    </Mutation>
  );
}

export default DeleteRecipe;
