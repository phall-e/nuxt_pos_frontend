<template>
  <el-container
    style="height: 100vh; background-color: #f5f5f9;"
  >
    <el-aside
      class="border-r bg-blue-800"
      width="250px"
    >
      <Sidebar/>
    </el-aside>
    <el-container>
      <el-header
        class="border-b flex items-center justify-between bg-white"
      >
        <div>
          <Icon name="fe:bar"/>
        </div>
        <div class="flex items-center gap-4">
          <el-dropdown>
            <Icon name="emojione-v1:flag-for-cambodia"/>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item class="flex items-center font-Nokora">
                  <Icon name="emojione-v1:flag-for-cambodia"/>&nbsp;&nbsp;ភាសាខ្មែរ
                </el-dropdown-item>
                <el-dropdown-item class="flex items-center font-Nokora">
                  <Icon name="emojione-v1:flag-for-united-states"/>&nbsp;&nbsp;English
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-image
            class="h-[40px] w-[40px] rounded-full"
            src="https://imgs.search.brave.com/G3no1L1jBEup9HSgEPGaVi0IIhlssTINXrPx9kBLMqo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgz/NDgwMjUzMS9waG90/by9wb3J0cmFpdC1v/Zi1hLXlvdW5nLW1h/bi1iYXNraW5nLWlu/LXRoZS1tb3JuaW5n/LXN1bi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9TkFfaW5h/azJWeXlUYXQ2a1RB/aUVtdUt3a2puX1ly/aDNvS0dYRmIyS1F3/ND0"
          />
        </div>
      </el-header>
      <el-main>
        <el-scrollbar>
          <slot/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  const auth = useAuthenticationStore();
</script>

<style>

</style>