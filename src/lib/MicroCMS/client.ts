import { createClient } from 'microcms-js-sdk';



export const client = createClient({
  serviceDomain: 'musicspot', 
  apiKey: 'Vjryxh2XeHDRhSAQMPPhHIdZzhzlOkURvZmR',
});

export const getAllMusics = async():Promise<object>=>{
  const allMusics = await client.getList({
    endpoint:"musicplayer"
  })
  return allMusics;
}