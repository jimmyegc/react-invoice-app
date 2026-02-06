
export function useCountries() {
  
  const getCountries = async () => {
    const { data, error } = await supabase
      .from('mvp_countries')
      .select('*')
      .order('name');

    if (error) throw error;    
    console.log("getCountries", data)
    return data;
  };

  const createCountry = async (payload: { name: string; iso: string }) => {
    const { error } = await supabase
      .from('mvp_countries')
      .insert(payload);

    if (error) throw error;
  };

  const updateCountry = async (
    id: number,
    payload: { name: string; iso: string }
  ) => {
    const { error } = await supabase
      .from('mvp_countries')
      .update(payload)
      .eq('id', id);

    if (error) throw error;
  };

  const deleteCountry = async (id: number) => {
    const { error } = await supabase
      .from('mvp_countries')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  return {
    getCountries,
    createCountry,
    updateCountry,
    deleteCountry,
  };
}
