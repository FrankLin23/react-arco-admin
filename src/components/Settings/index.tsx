import { GlobalState } from '@/store';
import useLocale from '@/utils/useLocale';
import { Drawer, Message } from '@arco-design/web-react';
import { IconSettings } from '@arco-design/web-react/icon';
import copy from 'copy-to-clipboard';
import React, { useState } from 'react';
import IconButton from '../Navbar/IconButton';
import { useSelector } from 'react-redux';

interface SettingProps {
  trigger?: React.ReactElement;
}

function Settings(props: SettingProps) {
  const { trigger } = props;
  const [visible, setVisible] = useState(false);
  const locale = useLocale();
  const settings = useSelector((state: GlobalState) => state.settings);

  function onCopySettings() {
    copy(JSON.stringify(settings, null, 2));
    Message.success(locale['settings.copySettings.message']);
  }

  return (
    <>
      {trigger ? (
        React.cloneElement(trigger as React.ReactElement, {
          onClick: () => setVisible(true),
        })
      ) : (
        <IconButton icon={<IconSettings />} onClick={() => setVisible(true)} />
      )}
      <Drawer
        width={300}
        title={
          <>
            <IconSettings />
            {locale['settings.title']}
          </>
        }
        visible={visible}
        okText={locale['settings.copySettings']}
        cancelText={locale['settings.close']}
        onOk={onCopySettings}
        onCancel={() => setVisible(false)}
      ></Drawer>
    </>
  );
}

export default Settings;
