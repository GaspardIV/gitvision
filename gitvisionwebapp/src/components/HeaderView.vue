<script setup lang="ts"></script>

<template>
  <div class="greetings">
    <h1 class="green">GitVision</h1>
    <h3>Immersive Visualization of Git Repositories</h3>
    <br />
    <p>
      GitVision is a web tool designed to visualize Git repositories in virtual, augmented, and 3D
      reality. You can read more information about this project on
      <a href="http://github.com/gaspardIV/gitvision" target="_blank">Github</a>. Try the
      visualization by exploring a repository from the list below. Personally i recommend start with tiny repository like cowsay,or async-listener, then move to medium repositories like Leaflet and Jekyll, then try large repositories (TensorFlow and Linux).
    </p>
    <br/>
    <p>
      Controls:<br/>
      Mobile and Mobile AR&VR: To move around, simply touch the screen and drag in the direction you want to fly. For rotation, tilt the device in the direction you wish to look.<br/>
      Desktop: Use the 'W' key to fly forward, 'S' key to fly backward, and 'A' and 'D' keys to strafe left and right respectively. Your mouse controls your viewpoint, simply move it to look around. To display the cursor, hit the 'Esc' key.<br/>
      AR & VR - Headset: Use the joysticks on your headset to control your movement in any direction. Your physical head movement controls the rotation, so just look in the direction you want to face.<br/>
    </p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
</style>
