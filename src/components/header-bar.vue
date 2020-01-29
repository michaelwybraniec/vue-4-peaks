<template>
  <header>
<b-navbar type="dark" variant="dark">
  
      <HeaderBarBrand></HeaderBarBrand>
         <HeaderBarLinks></HeaderBarLinks>

  </b-navbar>
  </header>
</template>

<script>
import HeaderBarBrand from '@/components/header-bar-brand';
import HeaderBarLinks from '@/components/header-bar-links';

export default {
  name: 'HeaderBar',
  components: { HeaderBarBrand, HeaderBarLinks },
};
</script>
