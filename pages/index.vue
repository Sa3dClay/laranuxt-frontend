<template>
  <div class="bg">
    <div class="overlay"></div>

    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" class="text-center">
          <div class="vertical">
            <v-btn
              large
              outlined
              color="blue"
              class="mx-2"
              to="/dashboard"
            >
              Post Topic
            </v-btn>

            <v-btn
              large
              outlined
              color="green"
              class="mx-2"
              to="/topics"
            >
              Browse Topics
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
  $pageHeight: 77vh;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }

  .bg {
    background-image: url('/background.jpg');
    background-size: cover;
    height: $pageHeight;
    position: relative;
  }

  .vertical {
    line-height: $pageHeight;
  }
</style>

<script>
export default {}
</script>
