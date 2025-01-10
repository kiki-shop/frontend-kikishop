import { FunctionComponent, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import InputComponent from '~/app/component/parts/input/input.component';
import { css } from '@emotion/react';

interface AddressData {
  city: string;
  district: string;
  commune: string;
}

interface AddressProps {
  control: any;
}

const Address: FunctionComponent<AddressProps> = ({ control }) => {
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [communes, setCommunes] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedCommune, setSelectedCommune] = useState<string>('');

  const loadCities = async () => {
    const response = await fetch('https://provinces.open-api.vn/api/');
    const data = await response.json();
    setCities(data);
  };

  const loadDistricts = async (cityName: string) => {
    const selectedCity = cities.find((city) => city.name === cityName);
    if (selectedCity) {
      const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`);
      const data = await response.json();
      setDistricts(data.districts);
    }
  };

  const loadCommunes = async (districtName: string) => {
    const selectedDistrict = districts.find((district) => district.name === districtName);
    if (selectedDistrict) {
      const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`);
      const data = await response.json();
      setCommunes(data.wards);
    }
  };

  useEffect(() => {
    loadCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      loadDistricts(selectedCity);
      setSelectedDistrict('');
      setSelectedCommune('');
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      loadCommunes(selectedDistrict);
      setSelectedCommune('');
    }
  }, [selectedDistrict]);

  return (
    <div className='sm:py-20 px-[16px] w-full lg:w-[60%] lg:mx-0'>
      <h3 className="title text-[22px] font-semibold"> Địa chỉ giao hàng</h3>
      <div css={itemForm}>
        <form className='rounded-md bg-white py-6 mt-4 space-y-6'>
          <div className='sm:flex pt-5 items-center sm:my-6 max-sm:my-14 w-full lg:w-[460px]'>
            <div className='sm:w-[200px] max-sm:px-3'>Họ và tên</div>
            <div className='w-full h-[34px]'>
              <Controller
                control={control}
                name="fullname"
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                  return (
                    <div className='w-full'>
                      <InputComponent
                        hideIcon={false}
                        placeholder="Họ và tên"
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        hasErorr={error}
                      />
                      {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div className='sm:flex pt-5 items-center sm:my-6 max-sm:my-14 sm:w-[460px]'>
            <div className='sm:w-[200px] max-sm:px-3'>Số điện thoại</div>
            <div className='w-full h-[34px]'>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                  return (
                    <div className='max-sm:w-full sm:w-[320px]'>
                      <InputComponent
                        hideIcon={false}
                        placeholder="Số điện thoại"
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        hasErorr={error}
                      />
                      {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div className='sm:flex pt-5 items-center sm:my-6 max-sm:my-14 sm:w-[460px]'>
            <div className='sm:w-[200px] max-sm:px-3'>Tỉnh/Thành Phố</div>
            <div className='w-full h-[34px]'>
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <div>
                    <div className="relative">
                      <input
                        list="brow"

                        style={{
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          setSelectedCity(selectedValue);
                          setSelectedDistrict('');
                          setSelectedCommune('');
                          onChange(selectedValue);
                        }}
                        value={value}
                        className='sm:w-[320px] max-sm:w-full'
                      />
                      <datalist id="brow">
                        <option value="">Chọn Tỉnh/Thành Phố</option>
                        {cities.map((city) => (
                          <option key={city.code} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </datalist>
                    </div>

                    {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                  </div>
                )}
              />
            </div>
          </div>

          <div className='sm:flex pt-5 items-center sm:my-6 max-sm:my-14 sm:w-[460px]'>
            <div className='sm:w-[200px] max-sm:px-3'>Quận/Huyện</div>
            <div className='w-full h-[34px]'>
              <Controller
                control={control}
                name="district"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <div>
                    <input
                      list="districtsDatalist"
                      style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                      }}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        setSelectedDistrict(selectedValue);
                        setSelectedCommune('');
                        onChange(selectedValue);
                      }}
                      value={value}
                      className='sm:w-[320px] max-sm:w-full'
                    />
                    <datalist id="districtsDatalist">
                      <option value="">Chọn Quận/Huyện</option>
                      {districts.map((district) => (
                        <option key={district.code} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </datalist>
                    {error && (
                      <span className="text-red-600 mt-3 mb-3 text-[1.2rem]">{error.message}</span>
                    )}
                  </div>

                )}
              />

            </div>
          </div>

          <div className='sm:flex pt-5 items-center sm:my-6 max-sm:my-14 sm:w-[460px]'>
            <div className='sm:w-[200px] max-sm:px-3'>Phường/Xã</div>
            <div className='w-full h-[34px]'>
              <Controller
                control={control}
                name="commune"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <div>
                    <input
                      list="communesDatalist"
                      style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                      }}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        setSelectedCommune(selectedValue);
                        onChange(selectedValue);
                      }}
                      value={value}
                      className='sm:w-[320px] max-sm:w-full'
                    />
                    <datalist id="communesDatalist">
                      <option value="">Chọn Phường/Xã</option>
                      {communes.map((commune) => (
                        <option key={commune.code} value={commune.name}>
                          {commune.name}
                        </option>
                      ))}
                    </datalist>
                    {error && (
                      <span className="text-red-600 mt-3 mb-3 text-[1.2rem]">{error.message}</span>
                    )}
                  </div>

                )}
              />
            </div>

          </div>

          <div className='sm:flex pt-5 items-center sm:my-6 max-sm:my-14 sm:w-[460px]'>
            <div className='sm:w-[200px] max-sm:px-3'>Địa chỉ chi tiết</div>
            <div className='w-full h-[34px]'>
              <Controller
                control={control}
                name="locationDetail"
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                  return (
                    <div className='sm:w-[320px] max-sm:w-full'>
                      <InputComponent
                        hideIcon={false}
                        placeholder="Địa chỉ chi tiết"
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        hasErorr={error}
                      />
                      {error && <span className='text-red-600 mt-3 mb-3 text-[1.2rem]'>{error.message}</span>}
                    </div>
                  );
                }}
              />
            </div>
          </div>
        </form>
      </div >
    </div >
  );
};

export default Address;

const itemForm = css`

  .bt {
    border: 1px solid rgb(2, 159, 209);
    color: rgb(255, 255, 255);
    background: rgb(0, 182, 240);
  }
  button {
    border: 1px solid gray;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  }
`;
