<template>
  <div class="modal" id="editFormModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editFormModalLabel">Edit form</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="handleCloseModal"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group mb-3" :class="{ invalid: titleError }">
              <label class="col-form-label ">Courses:</label>
              <input type="text" class="form-control" v-model.lazy="title" @blur="handleTitle" />
              <span class="form-message">{{ titleError }}</span>
            </div>
            <div class="form-group mb-3" :class="{ invalid: descriptionError }">
              <label class="col-form-label">Description:</label>
              <textarea class="form-control" v-model="description" @blur="handleDescription" />
              <span class="form-message">{{ descriptionError }}</span>
            </div>
            <div class="form-group mb-3" :class="{ invalid: urlError }">
              <label class="col-form-label">Url:</label>
              <input class="form-control" v-model="url" @blur="handleUrl" />
              <span class="form-message">{{ urlError }}</span>
            </div>
            <div class="form-group mb-3" :class="{ invalid: imageError }">
              <label class="col-form-label">Image:</label>
              <input class="form-control" v-model="image" @blur="handleImage" />
              <span class="form-message">{{ imageError }}</span>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                @click="handleUpdatePost"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watchEffect } from "vue";
import { useField, useForm } from "vee-validate";
import { ValidateForm } from "../../utils/validate";
export default {
  name: "EditForm",
  props: { findedPostProp: Object, loadFindedPostProp: Boolean },
  setup(props, { emit }) {
    const { handleSubmit } = useForm({ validationSchema: ValidateForm });
    const { value: title, errorMessage: titleError, handleChange: handleTitle } = useField("title");
    const {
      value: description,
      errorMessage: descriptionError,
      handleChange: handleDescription,
    } = useField("description");
    const { value: url, errorMessage: urlError, handleChange: handleUrl } = useField("url");
    const { value: image, errorMessage: imageError, handleChange: handleImage } = useField("image");

    watchEffect(() => {
      props.loadFindedPostProp;
      title.value = props.findedPostProp.title;
      description.value = props.findedPostProp.description;
      url.value = props.findedPostProp.url;
      image.value = props.findedPostProp.image;
    });

    const handleUpdatePost = handleSubmit(updatedPost => {
      emit("handle-update-post", updatedPost);
    });

    return {
      handleUpdatePost,
      title,
      description,
      url,
      titleError,
      handleTitle,
      descriptionError,
      handleDescription,
      urlError,
      handleUrl,
      image,
      imageError,
      handleImage,
    };
  },
};
</script>

<style scoped>
.modal-title {
  color: #4a5f88;
  font-size: 2rem;
}

.form-group.invalid .form-control {
  border-color: rgb(228, 5, 5);
  background-color: rgba(228, 5, 5, 0.4);
  color: #fff;
}

.form-message {
  color: #f33a58;
  font-size: 1.2rem;
  line-height: 1.6rem;
  padding: 4px 0 0;
}
</style>
